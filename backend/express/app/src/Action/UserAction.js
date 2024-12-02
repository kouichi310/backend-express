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
    
    if (data.Student && user.Student) {
      const student = await models.Student.findByPk(user.Student.id);
      if(!student) {
        throw new CustomException(404, 'Student not found', "error");
      }
      await student.update(data.Student);
    }

    await user.update(data);

    return user;
  } 

  async delete(id, data){
    const user = await models.User.findByPk(id, {
        include: ['Student']
    }).catch((error) => {
        throw new CustomException(404, 'User not found', "error");
    });

    if (!user) {
      throw new CustomException(404, 'User not found', "error");
    }

    if (user.Student) {
      const student = await models.Student.findByPk(user.Student.id);
      if(!student) {
        throw new CustomException(404, 'Student not found', "error");
      }
      await student.destroy();
    }

    await user.destroy();

    return user;
  }
};

module.exports = new UsersAction();