module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Items', 'published', Sequelize.DATE)
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Items', 'published')
    },
}
