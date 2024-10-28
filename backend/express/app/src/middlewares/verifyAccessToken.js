const jwt = require("jsonwebtoken");
const CustomException = require("../Exception/customException");
const errorHandler = require("./errorHandler");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

module.exports = async function verifyAccessToken(request, response, next) {
  try {
    const token = request.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log("=============AUTH TOKEN=============");
    console.debug(decodedToken);
    request.user_id = decodedToken.id;
    next();
  } catch {
    next(errorHandler(new CustomException(401, "Authorization failed!", "error"), response));
  }
};
