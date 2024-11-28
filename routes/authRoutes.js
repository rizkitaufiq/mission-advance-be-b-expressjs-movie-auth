const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const { authenticate } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", authController.register);

router.get("/activation", authController.activation);

router.post("/login", authController.login);

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  authController.upload
);

module.exports = router;
