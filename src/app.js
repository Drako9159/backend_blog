const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const morgan = require("morgan");
//For add apicache
//const apicache = require("apicache")
//let cache = apicache.middleware;
//app.use(cache("5 minutes"))

const cors = require("cors");

app.use(
  cors({
    origin: [
      process.env.DOMINIO,
      "http://localhost:5000",
      "http://192.168.1.207:5000",
    ],
    exposedHeaders: ["authorization"],
    credentials: true,
  })
);

app.set("port", process.env.PORT || 3000);
//for serve images

app.use(express.static(path.join(__dirname, "/storage/images/webp")));

app.use(morgan("dev"));
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", require("./routes"));
app.use("/api", require("./routes/posts.routes"));
app.use("/api", require("./routes/auth.routes"));
app.use("/api/v2", require("./routes/articles.routes"));
app.use("/api/v2", require("./routes/movies.routes"));

app.use((req, res, next) => {
  res
    .status(404)
    .header("Content-Type", "application/json; charset=utf-8")
    .send("404 Not Found");
});

// Configure cors options

module.exports = app;
