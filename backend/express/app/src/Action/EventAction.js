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

  async getById(id) {
    const fetchedEvent = await models.Event.findByPk(id, {
      include: ['Courses', 'Grades']
    }).catch((error) => {
        console.error(error);
        throw new CustomException(404, 'Event not found', "error");
    });

    if(!fetchedEvent) {
        throw new CustomException(404, 'Event not found', "error");
    }

    return fetchedEvent;
  }
};

module.exports = new EventAction();