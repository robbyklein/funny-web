const jwt = require('jwt-simple')

module.exports = user => {
    const sub = {
        id: user.id,
        admin: user.admin,
        name: user.name,
        email: user.email,
    }
    const iat = new Date().getTime()
    const token = jwt.encode({ sub, iat }, process.env.SECRET)

    return token
}
