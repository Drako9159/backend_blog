const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "/storage")));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", require("./routes"));
app.use("/api", require("./routes/posts.routes"));

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

module.exports = app;
