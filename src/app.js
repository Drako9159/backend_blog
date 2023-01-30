const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const morgan = require("morgan");


const cors = require("cors");
app.use(cors(/*{
  origin: "https://www.drako.icu"
}*/));



app.set("port", process.env.PORT || 3000);
//for serve images



app.use(express.static(path.join(__dirname, "/storage/images")));

app.use(morgan("dev"));
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", require("./routes"));
app.use("/api", require("./routes/posts.routes"));
app.use("/api", require("./routes/auth.routes"));

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});


// Configure cors options




module.exports = app;
