'use strict';
const bcrypt = require("bcrypt");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;
const { v4: uuidv4 } = require('uuid');

const data = [
  {
    id: '84b8d6f3-5b50-4a48-8cb4-9da1772bb842',
    name: 'test1',
    email: 'test1@test.com',
    password: bcrypt.hashSync('test1', SALT_ROUNDS),
  },
  {
    id: 'f01b2f80-7916-4e85-9f40-7509be99f70b',
    name: 'test2',
    email: 'test2@test.com',
    password: bcrypt.hashSync('test2', SALT_ROUNDS),
  },
  {
    id: 'ebe18b73-5fcf-4f65-98ca-9d5b82addb42',
    name: 'test3',
    email: 'test3@test.com',
    password: bcrypt.hashSync('test3', SALT_ROUNDS),
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach((each) => {
      each.createdAt = new Date();
      each.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
