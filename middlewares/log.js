const LogModel = require("../models/log");

/**
 * @method info     Log info
 * @method error    Log error
 * @method request  Log request
 */
class logger {
  /**
   *
   * @param {string} type
   * @param {any} data
   * @param {string} path
   */
  static error(path, body) {
    const log = new LogModel();
    log.type = "error";
    log.path = path;
    log.body = body;
    log.date = new Date();
    log.save();
  }
  /**
   *
   * @param {string} type
   * @param {any} data
   * @param {string} path
   */
  static info(path, body) {
    const log = new LogModel();
    log.type = "info";
    log.path = path;
    log.body = body;
    log.date = new Date();
    log.save();
  }

  /**log request @param {string} type */
  static request = (type) => {
    return async (req, res, next) => {
      const log = new LogModel();
      log.type = type;
      log.path = req.path;
      log.body = req.body;
      log.headers = req.headers;
      log.date = new Date();
      log.save();
      next();
    };
  };
}

module.exports = logger;
