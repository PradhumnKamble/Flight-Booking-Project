'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('flights' , {
      type :'FOREIGN KEY',
      name : 'flights_fkey_constraint',
      fields : ['arrivalAirportId'],
      references :{
        table : 'airports' ,
        field : 'id'
        },
      onUpdate : 'cascade' ,
      onDelete :'cascade'
      
    })
    await queryInterface.addConstraint('flights' , {
      type :'FOREIGN KEY',
      name : 'flights_fkey_constraint2',
      fields : ['departureAirportId'],
      references :{
        table : 'airports' ,
        field : 'id'
        },
      onUpdate : 'cascade' ,
      onDelete :'cascade'
      
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('flights' , 'flights_fkey_constraint');
     await queryInterface.removeConstraint('flights' , 'flights_fkey_constraint2');
  }
};
