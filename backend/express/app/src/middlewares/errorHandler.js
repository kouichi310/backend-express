const CustomException = require("../Exception/customException")

const errorHandler = (error, res) => {
    error.statusCode = error.statusCode || 500
    error.message = error.message || null
    error.logLevel = error.logLevel || null
  
    if (error instanceof CustomException) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        logLevel: error.logLevel
      })
    } else {
      res.status(500).json({
        statusCode: 500,
        message: "internal server error",
        logLevel: "error"
      })
      console.error(error)
    }
}

module.exports = errorHandler;
  