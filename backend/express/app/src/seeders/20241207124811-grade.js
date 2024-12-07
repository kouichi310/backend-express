'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        eventId: 1,
        grade: 1,
      },
      {
        eventId: 1,
        grade: 2,
      }
    ]
    data.forEach((each) => {
      each.createdAt = new Date();
      each.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Grades', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Grades', null, {});
  }
};
