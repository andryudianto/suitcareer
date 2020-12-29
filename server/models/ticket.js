'use strict';
const { v4: uuidv4 } = require('uuid')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Event)
      Ticket.belongsToMany(models.User, {through: models.UserTicket})
    }
  };
  Ticket.init({
    typeTicket: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    quota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    EventId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Ticket',
    hooks: {
      beforeCreate(ticket) {
        ticket.id = uuidv4()
      }
    }
  });
  return Ticket;
};