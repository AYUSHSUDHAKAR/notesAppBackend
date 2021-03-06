var express = require("express");
var colors = require("colors");
var morgan = require("morgan");
var dotenv = require("dotenv");
var connectDB = require("./config/db");

const app = express();

app.use(morgan("dev"));

app.use(express.json({}));

app.use(
  express.json({
    extended: true,
  })
);

dotenv.config({
  path: "./config/config.env",
});

connectDB();

app.use("/api/notes/auth", require("./routes/user"));
app.use("/api/notes", require("./routes/notes"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Servre is running on port ${PORT}`.red.underline.bold)
);
