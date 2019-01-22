const passport = require('passport')
const path = require('path')

const auth = require('./controllers/auth')
const items = require('./controllers/items')

const reqJwt = passport.authenticate('jwt', { session: false })
const reqLogin = passport.authenticate('local', { session: false })

require('./config/passport')

module.exports = function(app) {
    // Auth
    app.post('/api/login', reqLogin, auth.login)

    // Items
    app.get('/api/items', items.index)
    app.get('/api/items/:id', items.show)
    app.post('/api/items', reqJwt, items.create)
    app.delete('/api/items/:id', reqJwt, items.delete)

    // Catch all
    app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname + '/index.html')) })
}
