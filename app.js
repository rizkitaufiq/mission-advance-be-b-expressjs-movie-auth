require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");
const path = require("path");
const cors = require("cors");

const Router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", Router);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

const PORT = process.env.DB_PORT;

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
