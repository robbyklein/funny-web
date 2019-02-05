const { User } = require('../models')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await User.create({
            name: 'Robby',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASS,
        })

        return
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('User', null, {})
    },
}
