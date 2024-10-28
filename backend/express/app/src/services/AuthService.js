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

  async signUp() {}
};
