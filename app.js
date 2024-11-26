require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");

const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api", authRouter);

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
