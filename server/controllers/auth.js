const { User } = require('../models')
const generateToken = require('../helpers/generate-token')
const uniqueString = require('unique-string')
const hashPassword = require('../helpers/hash-password')

exports.login = (req, res) => {
    const auth = generateToken(req.user)
    res.send({ auth })
}
