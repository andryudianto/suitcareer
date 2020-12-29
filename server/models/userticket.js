'use strict';
const { v4: uuidv4 } = require('uuid')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserTicket.init({
    UserId: DataTypes.UUID,
    TicketId: DataTypes.UUID,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTicket',
    hooks: {
      beforeCreate(userticket) {
        userticket.id = uuidv4()
      }
    }
  });
  return UserTicket;
};