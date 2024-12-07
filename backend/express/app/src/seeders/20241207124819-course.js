'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        eventId: 1,
        course: 4,
      },
      {
        eventId: 1,
        course: 5,
      }
    ]
    data.forEach((each) => {
      each.createdAt = new Date();
      each.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Courses', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
