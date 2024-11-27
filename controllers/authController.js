const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = {
  register: async (req, res, next) => {
    try {
      const { fullname, username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = uuidv4();
      const user = await User.create({
        fullname,
        username,
        email,
        password: hashedPassword,
        status: "pending",
        token,
        profil: "https://ui-avatars.com/api/?name=John+Doe",
      });

      const activationLink = `${process.env.BASE_URL}/api/activation/token=${token}`;
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Account Activation",
        html: `<h1>Halo, ${fullname}</h1>
        <p>Silahkan Aktivasi akun anda dengan klik link dibawah:</p>
        <a href="${activationLink}">${activationLink}</a>`,
      };

      const mailerinfo = await transporter.sendMail(mailOptions);

      res.status(201).json({
        message:
          "'User registered successfully. Please check your email to activate your account",
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  activation: async (req, res, next) => {
    try {
      const { token } = req.query;
      const user = await User.findOne({ where: { token } });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Invalid or expired activation token" });
      }

      if (user.status === "active") {
        return res.status(400).json({ message: "User is already activated." });
      }

      user.status = "active";
      user.token = null;
      await user.save();

      res.status(200).json({ message: "User activated successfully" });
    } catch (error) {
      next(error);
    }
  },
};
