const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// router.get("/login", authController.login);

// router.get("/:id", authController.activate);

router.post("/register", authController.register);

router.get("/activation", authController.activation);

module.exports = router;
