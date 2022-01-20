const logger = require("../middlewares/log");

/**
 * Error middleware return 500
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} res
 */
const error = (err, req, res, next) => {
  logger.error("ErrorHandler", err.message);

  return res.status(500).send("Error see logs.");
};

module.exports = error;
