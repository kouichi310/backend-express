const CustomException = require("../Exception/customException");
const models = require("../models");

class UsersAction {
  async fetchAll() {
    const fetchedUsers = await models.User.findAll();

    return fetchedUsers;
  }

  async fetchById(id) {
    const fetchedUser = await models.User.findByPk(id, {
        include: ['Student']
    }).catch((error) => {
        throw new CustomException(404, 'User not found', "error");
    });

    return fetchedUser;
  }
};

module.exports = new UsersAction();