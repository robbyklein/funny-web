'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tagging = sequelize.define('Tagging', {
    ItemId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {});
  Tagging.associate = function(models) {
    // associations can be defined here
  };
  return Tagging;
};