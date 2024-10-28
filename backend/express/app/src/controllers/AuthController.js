const errorHandler = require("../middlewares/errorHandler");
const authAction = require("../Action/AuthAction");

module.exports = class AuthController {
  static async login(request, response, next) {
    try {
      const { body } = request;
      const authInfo = await authAction.login(body);
      response.json(authInfo);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }

  static async signup(request, response, next) {
    try {
      const { body } = request;
      const authInfo = await authAction.signup(body);
      response.json(authInfo);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }

  static async refresh(request, response, next) {
    try {
      const { body } = request;
      const authInfo = await authAction.refresh(body);
      response.json(authInfo);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }

  static async logout(request, response, next) {
    try {
      const authInfo = await authAction.logout(request.user_id);
      response.json({"status": true, "message": 'Logged out successfully'});;
    } catch (error) {
      next(errorHandler(error, response));
    }
  }
};
