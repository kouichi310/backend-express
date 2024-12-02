const CustomException = require("../Exception/customException");
const models = require("../models");

class UnitsAction {
  async fetchByUserId(id) {
    const fetchedUnit = await models.Unit.findOne({ where: { userId: id } }).catch((error) => {
        throw new CustomException(404, 'User not found', "error");
    });

    if(!fetchedUnit) {
        throw new CustomException(404, 'Unit not found', "error");
    }

    return fetchedUnit;
  }

  async update(userId, body) {
    const unitString = body.unit.join(',');
    const data = { userId: userId, unit: unitString };
    const updatedUnit = await models.Unit.upsert(data).catch((error) => {
        console.error(error);
        throw new CustomException(400, 'Unit not updated', "error");
    });

    return updatedUnit;
  }
};

module.exports = new UnitsAction();