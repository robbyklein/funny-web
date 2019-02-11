// Dependencies
const passport = require('passport')
const path = require('path')

// Controllers
const auth = require('./controllers/auth')
const items = require('./controllers/items')
const pages = require('./controllers/pages')
const tags = require('./controllers/tags')

// Auth Middleware
const reqJwt = passport.authenticate('jwt', { session: false })
const reqLogin = passport.authenticate('local', { session: false })
const upload = require('./helpers/item-upload')

// Setup passport
require('./config/passport')

module.exports = function(app) {
    // Auth
    app.post('/api/login', reqLogin, auth.login)

    // Items
    app.get('/api/items', items.index)
    app.get('/api/admin-items', reqJwt, items.index)
    app.get('/api/items/:id', items.show)
    app.get('/api/admin-items/:id', reqJwt, items.show)
    app.post('/api/items', reqJwt, upload.array('source', 1), items.create)
    app.post('/api/items/:id', reqJwt, upload.array('source', 1), items.edit)
    app.delete('/api/items/:id', reqJwt, items.delete)

    // Tags
    app.get('/api/tags', tags.index)
    app.get('/api/items/tag/:id/page/:page', tags.items)

    // Pages
    app.get('/', pages.index)

    // Catch Admin Routes
    app.get('/admin*', (req, res) => res.render('admin'))
}
