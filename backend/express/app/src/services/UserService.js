const models = require("../models");

module.exports = class UsersService {
  async fetchAll() {
    const fetchedUsers = await models.User.findAll();

    return fetchedUsers;
  }
};