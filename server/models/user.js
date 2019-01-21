const bcrypt = require('bcrypt-nodejs')
const uniqueString = require('unique-string')
const hashPassword = require('../helpers/hash-password')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            UserId: DataTypes.INTEGER,
            password: DataTypes.STRING,
            passwordReset: DataTypes.DATE
        },
        {}
    )

    User.associate = function(models) {
    }

    User.hook('beforeCreate', async (user, options) => {
        const hash = await hashPassword(user.password)

        user.confirmToken = uniqueString()
        user.password = hash
    })

    User.prototype.comparePassword = async function(canidate, callback) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(canidate, this.password, (err, isMatch) => {
                if (err) reject(Error('Failed to compare passwords.'))
                resolve(isMatch)
            })
        })
    }

    return User
}