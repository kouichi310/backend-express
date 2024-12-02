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

  static async update(request, response, next) {
    try {
      const unit = await UnitAction.update(request.user_id, request.body);
      response.json(unit[0]);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }
};