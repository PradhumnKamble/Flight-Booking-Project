'use strict';
const bcrypt = require('bcrypt');
const {ServerConfig} = require('../config')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role ,{through : 'User_Roles',as :'role'})
    }
  }
  User.init({
    email: {
      type :DataTypes.STRING,
      unique :true ,
      allowNull : false ,
      validate :{
        isEmail : true
      }
    },
    password: {
      type :DataTypes.STRING,
      unique :true ,
      allowNull : false ,
      validate :{
        len : [8,60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  // sequelzie hooks ( == triggers)
  // user is the object before it is is actually saved in the db 
  User.beforeCreate(function encrypt(user){
    const encryptedPass = bcrypt.hashSync(user.password , +ServerConfig.SALT_ROUNDS) ;
    user.password = encryptedPass ;
  }) ;

  return User;
};