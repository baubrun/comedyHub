const Events = require("../models/events");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const { uploadDestination } = require("../middlewares/util");

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No event found.`);
    }
    const event = await Events.findOneAndDelete({ _id: id });

    const __dirname = path.resolve(path.dirname(""));
    const pathToFile = path.join(__dirname, uploadDestination, event.image);
    const isFileExist = fs.existsSync(pathToFile);

    if (isFileExist) {
      fs.unlink(pathToFile, (err) => {
        if (err) throw err;
      });
    }

    return res.status(200).json({ event });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getEvent = async (req, res) => {
  const { id } = req.params;
  console.log("id :>> ", id);
  try {
    const event = await Events.findById(id).populate("venue");
    return res.status(200).json({ event });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Events.find({}).populate("venue");
    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getEventsByVenue = async (req, res) => {
  const { venueId } = req.params;
  try {
    const events = await Events.aggregate([
      { $match: { venue: mongoose.Types.ObjectId(venueId) } },
    ]).sort({ startDate: 1 });
    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const postEvent = async (req, res) => {
  const {
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    venue,
    performer,
    price,
    socialMedia,
  } = req.body;

  try {
    const files = req.files[0];
    if (files.length < 1) {
      return res.status(400).json({
        error: "Image required.",
      });
    } else {
      const regexList = [/\.jpe?g/i, /\.png/i];
      const ext = path.extname(files.originalname);
      if (regexList.some((x) => x === ext)) {
        return res.status(400).json({
          error: "Invalid image type.",
        });
      }
    }

    const newEvent = new Events({
      title: title,
      performer: performer,
      image: files.filename,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      price: price,
      // hostId: hostId,
      socialMedia: socialMedia,
      venue: venue,
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
  deleteEvent,
  getEvent,
  getEventsByVenue,
  getEvents,
  patchEvent,
  postEvent,
};
