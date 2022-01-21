const Venues = require("../models/venues");

const getVenues = async (req, res) => {
  try {
    let venues = await Venues.find({});

    return res.status(200).json({ venues });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getVenues,
};
