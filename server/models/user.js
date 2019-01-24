const bcrypt = require('bcrypt-nodejs')
const hashPassword = require('../helpers/hash-password')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            passwordReset: DataTypes.DATE
        },
        {}
    )

    User.associate = function(models) {
        User.hasMany(models.Item)
    }

    User.hook('beforeCreate', async (user, options) => {
        const hash = await hashPassword(user.password)
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