'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull : false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references :{
          model:'Airplanes',
          key :'id'
        },
        onDelete :'cascade'
      },
      arrivalAirportId: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      departureAirportId: {
        type: Sequelize.INTEGER,
        allowNull:false,   
      },
      airvalTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      boardingGate: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNUll:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};