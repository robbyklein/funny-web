const { User } = require('../models')
const generateToken = require('../helpers/generate-token')
const uniqueString = require('unique-string')
const hashPassword = require('../helpers/hash-password')

exports.login = (req, res) => {
    const auth_token = generateToken(req.user)
    res.send({ auth_token })
}
