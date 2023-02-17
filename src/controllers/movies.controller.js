const fs = require("node:fs");
const path = require("node:path");
const DB_PATH = path.join(process.cwd(), "./src/db/");
const json_movies = fs.readFileSync(`${DB_PATH}/movies.json`, "utf-8");

async function dbReader() {
  return (movies = JSON.parse(json_movies));
}

async function dbWriter(db) {
  fs.writeFileSync(
    `${DB_PATH}/movies.json`,
    JSON.stringify(db, null, 2),
    "utf-8"
  );
}

async function uploadMovie(req, res) {
  const { title, age, gender, synopsis, stars } = req.body;
  let data = {
    title: title,
    age: age,
    gender: gender,
    synopsis: synopsis,
    stars: stars,
  };
  //console.log(movies);
  dbWriter({ data: data });
  res.send({ message: "ok" });
}

module.exports = { uploadMovie };
