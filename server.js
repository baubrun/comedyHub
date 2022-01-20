const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error");
const logger = require("./middlewares/log");
const eventRoutes = require("./routes/events");
const config = require("./config/index");

/*=============
 Middleware 
 ==============*/

app.use(express.json());
app.use(cors());

app.use("/api/events", eventRoutes);
app.use("/", express.static("build"));

/*=============
 Handle Errors
 ==============*/
app.use(errorHandler);

/*================
  Port && Mongoose
  ===================*/

const options = {
  dbName: "comedy-hub",
};

mongoose
  .connect(config.DB_URI, options)
  .then(
    app.listen(config.PORT, () => {
      console.log("\nConnected to DB!");
      console.log(`Server is running on port ${config.PORT}!`);
    })
  )
  .catch((err) => logger.error("mongoose.connect", err));
