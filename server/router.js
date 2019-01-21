const passport = require('passport')
const path = require('path')
const auth = require('./controllers/auth')
const authVal = require('./validations/auth')

const reqJwt = passport.authenticate('jwt', { session: false })
const reqLogin = passport.authenticate('local', { session: false })

require('./config/passport')

module.exports = function(app) {
    // Auth
    app.post('/api/login', reqLogin, auth.login)

    // Catch all
    app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname + '/index.html')) })
}
