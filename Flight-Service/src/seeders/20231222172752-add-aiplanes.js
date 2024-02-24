'use strict';
const {Op} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(
     'Airplanes',
     [{
       modelNUmber:"airbus580",
       capacity:580,
       createdAt:new Date(),
       updatedAt:new Date(),
     }]);
    await queryInterface.bulkInsert(
     'Airplanes',
     [{
       modelNUmber:"a560",
       capacity:800,
       createdAt:new Date(),
       updatedAt:new Date(),
     }])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes' ,{
      [Op.or]:[{modelNUmber:'a560'} , {modelNUmber:'airbus580'}] 
    })
  }
};
