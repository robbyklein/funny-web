module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define(
        'Tag',
        {
            title: DataTypes.STRING,
        },
        {}
    )
    Tag.associate = function(models) {
        Tag.belongsToMany(models.Item, { through: models.Tagging })
    }
    return Tag
}
