const multer = require("multer");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
const { uploadDestination } = require("./util/index");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDestination);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${uuidv1()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const multerInit = multer({
  storage: fileStorage,
  fileFilter,
  limits: {
    fileSize: 2.5e7, // 25mb
  },
}).any("uploads");

const upload = (req, res, next) => {
  const uploadsDir = fs.existsSync(uploadDestination);
  if (!uploadsDir) {
    fs.mkdirSync(uploadDestination);
  }

  multerInit(req, res, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    next();
  });
};

module.exports = upload;
