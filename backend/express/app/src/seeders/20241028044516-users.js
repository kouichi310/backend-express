'use strict';
const bcrypt = require("bcrypt");
const salt = parseInt(process.env.SALT, 10) || 10;
const { v4: uuidv4 } = require('uuid');

const data = [
  {
    name: 'test1',
    email: 'test1@test.com',
    password: bcrypt.hashSync('test1', salt),
  },
  {
    name: 'test2',
    email: 'test2@test.com',
    password: bcrypt.hashSync('test2', salt),
  },
  {
    name: 'test3',
    email: 'test3@test.com',
    password: bcrypt.hashSync('test3', salt),
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach((each) => {
      each.id = uuidv4();
      each.createdAt = new Date();
      each.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
