const multer = require("multer");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");

const devUploadsPath = "./public/uploads";
const prodUploadsPath = "./build/uploads";

const dest =
  process.env.NODE_ENV === "production" ? prodUploadsPath : devUploadsPath;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv1());
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
  const dir = fs.existsSync(dest);
  if (!dir) {
    fs.mkdirSync(dest);
  }

  multerInit(req, res, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      try {
        const data = req.body.data && JSON.parse(req.body.data);
        const files = (req.files || []).map((file) => ({
          name: file.originalname,
          nameOnDisk: file.filename,
          type: file.mimetype.split("/")[0],
          extension: file.mimetype.split("/")[1],
          size: file.size,
        }));

        req.body = data;
        req.files = { ...req.files, uploads: files };

        next();
      } catch (err) {
        res.status(400).send(err.message);
      }
    }
  });
};

module.exports = upload;