'use strict'
module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
        'Item',
        {
            tags: DataTypes.JSON,
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
