'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.City,{
        foreignKey  : 'cityId' ,
      })
      this.hasMany(models.Flights  ,{
        foreignKey : 'arrivalAirportId',
        onUpdate:'cascade' ,
        onDelete:'cascade'
      })
      this.hasMany(models.Flights  ,{
        foreignKey : 'departureAirportId',
        onUpdate:'cascade' ,
        onDelete:'cascade'
      })
    }
  }
  airport.init({
    name: {
      type:DataTypes.STRING,
      allowNull : false,
      unique:true
    },
    code:{
      type:DataTypes.STRING,
      allowNull : false ,
      unique :true
    },
    address: {
      type:DataTypes.STRING,
      allowNull :false 
    },
    cityId: {
      type:DataTypes.INTEGER,
      allowNull : false
    },
    createdAt : {
      type:DataTypes.DATE,
      allowNull : false
    },
    updatedAt : {
      type:DataTypes.DATE,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'airport',
  });
  return airport;
};