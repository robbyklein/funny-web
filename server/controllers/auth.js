const generateToken = require('../helpers/generate-token')

exports.login = (req, res) => {
    const auth = generateToken(req.user)
    res.send({ auth })
}
