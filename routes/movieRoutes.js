const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const movieController = require("../controllers/movieController");

router.get("/movies", authenticate, movieController.getMovie);

module.exports = router;
