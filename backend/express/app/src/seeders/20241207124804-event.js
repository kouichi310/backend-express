'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        title: 'test',
        start: '2024-12-07 12:00:00',
        end: '2024-12-07 13:00:00',
        description: 'test',
        place: 'test',
        public: true,
        category: 1,
        create_mail: 'test@test.com',
        change_mail: 'test@test.com',
      }
    ]
    data.forEach((each) => {
      each.createdAt = new Date();
      each.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Events', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
