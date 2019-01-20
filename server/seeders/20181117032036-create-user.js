const { User } = require('../models')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await User.create({
            name: 'Robby',
            email: 'admin@gmail.com',
            password: 'password',
        })

        return
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('User', null, {})
    },
}
