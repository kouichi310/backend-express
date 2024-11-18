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

  async update(id, data) {
    const user = await models.User.findByPk(id, {
        include: ['Student']
    }).catch((error) => {
        throw new CustomException(404, 'User not found', "error");
    });

    if (!user) {
      throw new CustomException(404, 'User not found', "error");
    }
    
    await user.update(data);

    if (data.Student && user.Student) {
      const student = await models.Student.findByPk(user.Student.id);
      await student.update(data.Student);
    }

    return user;
  } 
};

module.exports = new UsersAction();