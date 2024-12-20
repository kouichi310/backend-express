const errorHandler = require("../middlewares/errorHandler");
const UserAction = require("../Action/UserAction");

module.exports = class UsersController {
  static async index(request, response, next) {
    try {
      const users = await UserAction.fetchAll();
      response.json(users);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }

  static async me(request, response, next) {
    try {
      const user = await UserAction.fetchById(request.user_id);
      response.json(user);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }

  static async update(request, response, next) {
    try {
      const user = await UserAction.update(request.user_id, request.body);
      response.json(user);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }

  static async delete(request, response, next) {
    try {
      const user = await UserAction.delete(request.user_id);
      response.json({ message: "sucess" });
    } catch (error) {
      next(errorHandler(error, response));
    }
  }
};