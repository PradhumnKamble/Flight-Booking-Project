'use strict';

const {Enums} = require('../utils/common');

const {BOOKED , IN_PROCESS,CANCELLED } = Enums.BOOKING_STATUS;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      status: {
        type: Sequelize.ENUM,
        allowNull : false ,
        values : [BOOKED , IN_PROCESS,CANCELLED ] ,
        defaultValue : IN_PROCESS
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 1
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};