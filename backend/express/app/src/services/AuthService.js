//require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");
const jwtService = require("./JwtService");
const CustomException = require("../Exception/customException");

module.exports = class AuthService {
  async login(body) {
    const { email, password } = body;
    const resJson = models.User.findOne({
      where: {
        email,
      },
    }).then(async (loggedInUser) => {
      if (!loggedInUser){
        throw new CustomException(403, "Authorization failed!", "error");
      }

      const isPasswordValid = await bcrypt.compare(password, loggedInUser.password);
      if (!isPasswordValid) {
        throw new CustomException(403, "Authorization failed!", "error");
      }
      const tokens = await Promise.all([
        jwtService.generateAccessToken(loggedInUser),
        jwtService.generateRefreshToken(loggedInUser, true, true),
      ]);

      let resJSON = { ...loggedInUser.dataValues, ...tokens[0], ...tokens[1] }
      delete resJSON.password
      return resJSON;
    });
    return resJson;
  }

  async signup(body) {
    const { email, password } = body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    if (!email || !password) {
      throw new CustomException(400, 'Username, email and password are mandatory.', 'error');
    }

    const newUser = await models.User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name: email.split("@")[0],
        email: email,
        password: hashedPassword,
      },
    }).then(([user, created]) => {
      if (!created) {
        throw new CustomException(409, "User already exists!", "error");
      }
      let resJSON = { ...user.dataValues }
      delete resJSON.password
      return resJSON;
    });

    return newUser;
  }
};
