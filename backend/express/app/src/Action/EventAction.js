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

  async create(data) {
    const createdEvent = await models.Event.create(data, {
      include: ['Courses', 'Grades'],
      afterCreate: async (createdEvent, options) => {
        if (data.Courses) {
          data.Courses.forEach(course => {
            course.eventId = createdEvent.id;
          });
          await models.Course.bulkCreate(data.Courses);
        }
        if (data.Grades) {
          data.Grades.forEach(grade => {
            grade.eventId = createdEvent.id;
          });
          await models.Grade.bulkCreate(data.Grades);
        }
      }
    }).catch((error) => {
        console.error(error);
        throw new CustomException(404, 'Event not created', "error");
    });

    return createdEvent;
  }

  async update(id, data) {
    const updatedEvent = await models.Event.update(data, {
      where: { id }
    }).catch((error) => {
        console.error(error);
        throw new CustomException(404, 'Event not updated', "error");
    });

    if (data.Courses) {
      await models.Course.destroy({ where: { eventId: id } });
      data.Courses.forEach(course => {
        course.eventId = id;
      });
      await models.Course.bulkCreate(data.Courses);
    }

    if (data.Grades) {
      await models.Grade.destroy({ where: { eventId: id } });
      data.Grades.forEach(grade => {
        grade.eventId = id;
      });
      await models.Grade.bulkCreate(data.Grades);
    }

    const event = await this.getById(id);
    return event;
  }
};

module.exports = new EventAction();