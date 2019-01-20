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
    app.post('/api/signup', authVal.signup, auth.signup)
    app.post('/api/forgot', auth.forgot)
    app.post('/api/reset', authVal.reset, auth.reset)
    app.get('/api/activate/:confirmToken', auth.activate)

    // Catch all
    app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname + '/index.html')) })
}
