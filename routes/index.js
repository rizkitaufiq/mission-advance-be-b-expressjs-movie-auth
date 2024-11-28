const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const movieRoutes = require("./movieRoutes");

router.use("", authRoutes);
router.use("", movieRoutes);

module.exports = router;
