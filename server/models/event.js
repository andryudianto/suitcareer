'use strict';
const { v4: uuidv4 } = require('uuid')
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
      Event.belongsTo(models.Location)
      Event.hasMany(models.Ticket)
    }
  };
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        notEnd(value) {
          if (value > this.start) {
            throw 'invalid date'
          }
        },
        notYesterday(value) {
          if (value < new Date()) {
            throw 'invalide date'
          }
        }
      }
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        notStart(value) {
          if (value < this.start) {
            throw 'invalid date'
          }
        }
      }
    },
    LocationId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Event',
    hooks:{
      beforeCreate(event) {
        event.id = uuidv4() 
      }
    }
  });
  return Event;
};