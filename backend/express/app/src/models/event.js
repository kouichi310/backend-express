'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Grade, {
        foreignKey: 'eventId',
      });
      Event.hasMany(models.Course, {
        foreignKey: 'eventId',
      });
    }
  }
  Event.init({
    title: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    description: DataTypes.STRING,
    place: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
    category: DataTypes.INTEGER,
    create_mail: DataTypes.STRING,
    change_mail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};