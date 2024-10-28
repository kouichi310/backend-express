const jwt = require("jsonwebtoken");
const User = require("../models/user");
const CustomException = require("../Exception/customException");

module.exports = class AuthService {
  async login(body) {
    const { email, password } = body;
    const loggedInUser = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!loggedInUser){
      throw new CustomException(403, "Authorization failed!", "error");
    }

    const token = jwt.sign(
      { userId: loggedInUser.id, email: loggedInUser.email },
      "SECRET_KEY",
      { expiresIn: "600000" } // 10 minutes
    );
    return token;
  }

  async signUp() {}
};
