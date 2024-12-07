const errorHandler = require("../middlewares/errorHandler");
const EventAction = require("../Action/EventAction");

module.exports = class UnitsController {
  static async index(request, response, next) {
    try {
      const events = await EventAction.index();
      response.json(events);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }

  static async view(request, response, next) {
    try {
      const event = await EventAction.getById(request.params.id);
      response.json(event);
    } catch (error) {
      next(errorHandler(error, response));
    }
  }
};