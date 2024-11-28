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

      const activationLink = `${process.env.BASE_URL}/api/activation?token=${token}`;
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

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Email not registered" });
      }

      if (user.status !== "active") {
        return res.status(400).json({
          message: "Account is not activated. Please activate your account",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful !",
        token,
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  upload: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      const filePath = req.file.path;
      console.log("File Path:", filePath);

      const user = await User.findOne({ where: { id: req.user.id } });

      user.profil = req.file.filename;
      await user.save();

      res.status(200).json({
        message: "Profile picture uploaded and updated successfully.",
        filePath,
      });
    } catch (error) {
      next(error);
    }
  },
};
