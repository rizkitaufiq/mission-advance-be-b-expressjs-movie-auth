const { Movie } = require("../models");
module.exports = {
  getMovie: async (req, res, next) => {
    try {
      const movie = await Movie.findAll();
      res.status(200).json({
        message: "Movies fetched successfully",
        data: movie,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
