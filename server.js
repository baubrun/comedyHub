const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error");
const logger = require("./middlewares/log");
const config = require("./config/index");
const eventRoutes = require("./routes/events");
const venueRoutes = require("./routes/venues");
const paymentRoutes = require("./routes/payment");

/*=============
 Middleware 
 ==============*/

app.use(express.json());
app.use(cors());

app.use("/api/events", eventRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/payment", paymentRoutes);
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
