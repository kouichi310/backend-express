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
};

module.exports = new UnitsAction();