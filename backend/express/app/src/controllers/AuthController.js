const errorHandler = require("../middlewares/errorHandler");
const AuthService = require("../services/AuthService");

module.exports = class AuthController {
  static async login(request, response, next) {
    try {
      const { body } = request;
      const authInfo = await new AuthService().login(body);
      response.json(authInfo);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }
};
