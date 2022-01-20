require("dotenv/config");

module.exports = {
  DB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 5000,
};
