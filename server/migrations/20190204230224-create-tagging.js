module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Taggings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            ItemId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Items',
                }
            },
            TagId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tags',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Taggings')
    },
}
