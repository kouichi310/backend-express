const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./configs/general.config.js");
const sequelize = require("./sequelize.js");
const router = require("./router.js");
const CustomException = require("./Exception/customException.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

app.use(bodyParser.json());
app.use(cors(config.cors));

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.use(router);

//Not found
app.use((req, res, next) => {
  next(errorHandler(new CustomException(404, 'Endpoint not found!', 'error'), res))
})

app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error("Internal Server Error");
  }
});