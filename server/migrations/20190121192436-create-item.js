module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            iid: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            tags: {
                type: Sequelize.JSON,
            },
            source: {
                type: Sequelize.STRING,
            },
            published: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
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
        return queryInterface.dropTable('Items')
    },
}
