'use strict';
// models files put js level constraints and files in migrtaions actually put 
// db level constarints
// you will interact with models programmitically  , 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flights , {
        foreignKey : 'airplaneId',
        onDelete : 'cascade'
      })
      this.hasMany(models.seats , {
        foreignKey : 'airplaneId',
        onDelete : 'cascade'
      })
    }
  }
  Airplane.init({
    modelNumber: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlphanumeric:true
      }
    },
    capacity: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        max:1200
      }        
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};