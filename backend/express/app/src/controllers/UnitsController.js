const errorHandler = require("../middlewares/errorHandler");
const UnitAction = require("../Action/UnitAction");

module.exports = class UnitsController {
  static async get(request, response, next) {
    try {
      const units = await UnitAction.fetchByUserId(request.user_id);
      response.json(units);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }
};