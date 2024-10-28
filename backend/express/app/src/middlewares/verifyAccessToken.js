const jwt = require("jsonwebtoken");
const CustomException = require("../Exception/customException");
const errorHandler = require("./errorHandler");

module.exports = async function verifyAccessToken(request, response, next) {
  try {
    const token = request.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, "SECRET_KEY");
    console.log("=============AUTH TOKEN=============");
    console.debug(decodedToken);
    next();
  } catch {
    next(errorHandler(new CustomException(401, "Authorization failed!", "error"), response));
  }
};
