'use strict';

const {Enums} = require('../utils/common');

const {BOOKED , IN_PROCESS,CANCELLED } = Enums.BOOKING_STATUS;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking.init({
    flightId:{ 
      type:DataTypes.INTEGER,
      allowNull : false
    },
    userId: { 
      type:DataTypes.INTEGER,
      allowNull : false
    },
    status: {
      type:DataTypes.ENUM,
      allowNull:false,
      values : [BOOKED , IN_PROCESS, CANCELLED ] ,
      defaultValue : IN_PROCESS
    },
    noOfSeats: { 
      type:DataTypes.INTEGER,
      allowNull : false,
      defaultValue : 1
    },
    totalCost: { 
      type:DataTypes.INTEGER,
      allowNull : false,
      defaultValue : 0
    }
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};