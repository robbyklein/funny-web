const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const { User } = require('../models')
const secretOrKey = process.env.SECRET

// Local
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    // Find user by email
    const user = await User.findOne({ where: { email } }).catch(err => done(err))

    // Check it exists
    if (!user) return done(null, false)

    // Compare passwords
    const match = await user.comparePassword(password).catch(err => done(err))

    // If they don't match
    if (!match) return done(null, false)

    // Success
    return done(null, user)
})

passport.use(localLogin)

// JWT
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey,
}
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    // Find use from id in token
    const user = await User.findOne({ where: { id: payload.sub.id } }).catch(err =>
        done(err)
    )

    // Make sure it exists
    if (!user) return done(null, false)

    // Success
    done(null, user)
})

// Tell passport to use strat
passport.use(jwtLogin)
