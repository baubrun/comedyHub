const Events = require("../models/events");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const postEvent = async (req, res) => {
  const {
    files,
    // body: {
    //   title,
    //   startDate,
    //   startTime,
    //   endDate,
    //   endTime,
    //   venue,
    //   performer,
    //   price,
    //   facebook,
    //   instagram,
    //   twitter,
    //   hostId,
    // },
  } = req;

  try {
    const file = files[0];
    if (files.length < 1) {
      return res.status(400).json({
        error: "Image required.",
      });
    } else {
      const regexList = [/\.jpe?g/i, /\.png/i];
      const ext = path.extname(file.originalname);
      if (regexList.some((x) => x === ext)) {
        return res.status(400).json({
          error: "Invalid image type.",
        });
      }
    }

    const newEvent = new Events({
      //   title: title,
      //   startDate: startDate,
      //   startTime: startTime,
      //   endDate: endDate,
      //   endTime: endTime,
      //   venue: venue,
      //   performer: performer,
      //   price: price,
      //   hostId: hostId,
      image: file.filename,
      //   socialMedia: {
      //     facebook: facebook,
      //     instagram: instagram,
      //     twitter: twitter,
      //   },
    });

    await newEvent.save();

    return res.status(200).json({
      event: newEvent,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Events.find({});
    return res.status(200).json({
      events: events,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No event found.`);
    }
    const event = await Events.findOneAndDelete({ _id: id });

    const __dirname = path.resolve(path.dirname(""));
    const pathToFile = path.join(__dirname, "public/uploads", event.image);

    const isFileExist = fs.existsSync(pathToFile);

    if (isFileExist) {
      fs.unlink(pathToFile, (err) => {
        if (err) throw err;
      });
    }

    return res.status(200).json({ isFileExist, id, pathToFile });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const patchEvent = async (req, res) => {
  const _id = req.params.eventId;
  const {
    files,
    body: {
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      venue,
      performer,
      price,
      facebook,
      instagram,
      twitter,
      hostId,
    },
  } = req;

  try {
    let file = files[0];
    if (files.length < 1) {
      return res.json({
        error: "Image required.",
      });
    } else {
      const regexList = [/\.jpe?g/i, /\.png/i];
      const ext = path.extname(file.originalname);
      if (regexList.some((x) => x === ext)) {
        return res.json({
          error: "Invalid image type.",
        });
      }
    }

    await Events.findByIdAndUpdate(_id, {
      title: title,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      venue: venue,
      performer: performer,
      price: price,
      hostId: hostId,
      image: file.filename,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
    });

    const events = await Events.find({});
    return res.status(200).json({
      events: events,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  postEvent,
  getEvents,
  deleteEvent,
  patchEvent,
};
