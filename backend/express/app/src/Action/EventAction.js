const CustomException = require("../Exception/customException");
const models = require("../models");

class EventAction {
  async index() {
    const fetchedEvents = await models.Event.findAll({
      include: ['Courses', 'Grades']
    }).catch((error) => {
        console.error(error);
        throw new CustomException(404, 'Events not found', "error");
    });

    if(!fetchedEvents) {
        throw new CustomException(404, 'Events not found', "error");
    }

    return fetchedEvents;
  }
};

module.exports = new EventAction();