const { User } = require("../models");
// const db = require("../../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  register: async (req, res, next) => {
    try {
      const { fullname, username, email, password, status, profil } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        fullname,
        username,
        email,
        password: hashedPassword,
        status: "pending",
        profil,
      });
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
      );
      res.status(201).json({
        message:
          "'User registered successfully. Please activate your account using the activation token",
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  activation: async (req, res, next) => {
    try {
      const { token } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isActive = true;
      await user.save();

      res.status(200).json({ message: "User activated successfully" });
    } catch (error) {
      next(error);
    }
  },
};
