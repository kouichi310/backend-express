//require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");
const CustomException = require("../Exception/customException");

const SALT_ROUNDS = parseInt(process.env.SALT, 10) || 10;
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

module.exports = class AuthService {
  async login(body) {
    const { email, password } = body;
    const loggedInUser = await models.User.findOne({
      where: {
        email,
      },
    });

    if (!loggedInUser){
      throw new CustomException(403, "Authorization failed!", "error");
    }

    const isPasswordValid = await bcrypt.compare(password, loggedInUser.password);
    if (!isPasswordValid) {
      throw new CustomException(403, "Authorization failed!", "error");
    }

    try {
      const token = jwt.sign(
        { userId: loggedInUser.id, mail: loggedInUser.mail },
        JWT_SECRET,
        { expiresIn: "600000" } // 10 minutes
      );
      return token;
    } catch (error) {
      throw new CustomException(403, "token create error!", "error");
    }
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
