const errorHandler = require("../middlewares/errorHandler");
const AuthService = require("../services/AuthService");

const authService = new AuthService();

module.exports = class AuthController {
  static async login(request, response, next) {
    try {
      const { body } = request;
      const authInfo = await authService.login(body);
      response.json(authInfo);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }

  static async signup(request, response, next) {
    try {
      const { body } = request;
      const authInfo = await authService.signup(body);
      response.json(authInfo);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }
};
