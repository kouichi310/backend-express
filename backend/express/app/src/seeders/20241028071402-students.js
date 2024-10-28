'use strict';

const data = [
  {
    userId: '84b8d6f3-5b50-4a48-8cb4-9da1772bb842',
    grade: 5,
    dept: 4,
  },
  {
    userId: 'f01b2f80-7916-4e85-9f40-7509be99f70b',
    grade: 5,
    dept: 4,
  },
  {
    userId: 'ebe18b73-5fcf-4f65-98ca-9d5b82addb42',
    grade: 5,
    dept: 4,
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach((each) => {
      each.createdAt = new Date();
      each.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Students', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students', null, {});
  }
};
