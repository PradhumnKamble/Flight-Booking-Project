'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane , {
        foreignKey : 'airplaneId' ,
        as : 'airplaneDetails' 
      })
      this.belongsTo(models.airport , {
        foreignKey : 'arrivalAirportId',
        as : 'arrivalAirportDetails' ,
      })
      this.belongsTo(models.airport , {
        foreignKey : 'departureAirportId',
         as : 'departureAirportDetails' ,
      })
    }
  }
  Flights.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull : false
    },
    airplaneId: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    arrivalAirportId: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    departureAirportId:  {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    airvalTime: {
      type :DataTypes.DATE,
      allowNull : false
    },
    departureTime: {
      type :DataTypes.DATE,
      allowNull : false
    },
    boardingGate: DataTypes.STRING,
    price: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    totalSeats: { // total remaining seats
      type : DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Flights',
  });
  return Flights;
};