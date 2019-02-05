const nanoid = require('nanoid')

module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
        'Item',
        {
            iid: DataTypes.STRING,
            source: DataTypes.STRING,
            published: DataTypes.BOOLEAN,
            UserId: DataTypes.INTEGER,
        },
        {}
    )

    Item.associate = function(models) {
        Item.belongsTo(models.User, { onDelete: 'cascade' })
        Item.belongsToMany(models.Tag, { through: models.Tagging })
    }
    return Item
}
