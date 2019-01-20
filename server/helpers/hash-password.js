const bcrypt = require('bcrypt-nodejs')

module.exports = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(Error('Failed to salt password.'))
            }

            bcrypt.hash(password, salt, null, (err, hash) => {
                if (err) {
                    reject(Error('Failed to hash password.'))
                }
                resolve(hash)
            })
        })
    })
}