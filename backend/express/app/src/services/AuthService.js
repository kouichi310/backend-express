const jwt = require("jsonwebtoken");
const models = require("../models");
const CustomException = require("../Exception/customException");

module.exports = class AuthService {
  async login(body) {
    const { mail, password } = body;
    const loggedInUser = await models.User.findOne({
      where: {
        mail,
        password,
      },
    });

    if (!loggedInUser){
      throw new CustomException(403, "Authorization failed!", "error");
    }

    try {
      const token = jwt.sign(
        { userId: loggedInUser.id, email: loggedInUser.email },
        "SECRET_KEY",
        { expiresIn: "600000" } // 10 minutes
      );
      return token;
    } catch (error) {
      throw new CustomException(403, "token create error!", "error");
    }
  }

  async signUp() {}
};
