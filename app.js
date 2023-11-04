const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const { contactsRouter, authRouter } = require("./routes");

const app = express();

const frontendUrl = process.env.FRONTEND_URL;

const corsOptions = {
  origin: [frontendUrl, "http://localhost:3001"],
  credentials: true,
  optionsSuccessStatus: 200,
};

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
