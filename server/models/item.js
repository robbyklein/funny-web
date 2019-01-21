'use strict'
module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
        'Item',
        {
            tags: DataTypes.JSON,
        },
        {}
    )
    Item.associate = function(models) {
        Item.belongsTo(models.User, { onDelete: 'cascade' })
    }
    return Item
}
