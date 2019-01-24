const nanoid = require('nanoid')

module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
        'Item',
        {
            iid: DataTypes.STRING,
            tags: DataTypes.JSON,
            source: DataTypes.STRING,
            published: DataTypes.BOOLEAN,
            UserId: DataTypes.INTEGER,
        },
        {}
    )

    Item.associate = function(models) {
        Item.belongsTo(models.User, { onDelete: 'cascade' })
    }
    return Item
}
