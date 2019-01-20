const v = require('validator')
const { validateEmail, validatePassword } = require('../helpers/regexs')
const { User } = require('../models')

exports.signup = async function(req, res, next) {
    const { email, password, name, role } = req.body
    let errors = []

    // Validate email format
    if (email === undefined || !validateEmail(email)) {
        errors.push('Enter a valid email.')
    }

    // Validate email uniqueness
    const user = await User.find({ where: { email } })
    if (user) errors.push('Email address already in use.')

    // Make it lowercase and such
    req.body.email = v.normalizeEmail(email)

    // Validate password
    if (password === undefined || !validatePassword(password)) {
        errors.push('Password must be 8+ characters.')
    }

    // Validate name
    if (name === undefined || !v.isLength(name, { min: 1, max: 240 })) {
        errors.push('You must enter a name.')
    }

    // Stop and send errors if they exist
    errors.length ? res.status(422).send({ errors }) : next()
}

exports.reset = async function(req, res, next) {
    const { password } = req.body
    let errors = []

    // Validate password
    if (password === undefined || !validatePassword(password)) {
        errors.push('Password must be 8+ characters.')
    }

    // Stop and send errors if they exist
    errors.length ? res.status(422).send({ errors }) : next()
}