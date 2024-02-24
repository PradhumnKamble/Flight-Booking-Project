'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('airports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
      type:Sequelize.STRING,
      allowNull : false,
      unique:true
     },
    code:{
      type:Sequelize.STRING,
      allowNull : false ,
      unique :true
    },
    address: {
      type:Sequelize.STRING,
      allowNull :false 
    },
    cityId: {
      type:Sequelize.INTEGER,
      allowNull : false
    },
    createdAt : {
      type:Sequelize.DATE,
      allowNull : false
    },
    updatedAt : {
      type:Sequelize.DATE,
      allowNull : false
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('airports');
  }
};