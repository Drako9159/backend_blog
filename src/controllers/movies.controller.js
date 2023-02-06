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
  const tes = { name: "antonio" };

  //console.log(movies);
    dbWriter(tes)
  res.send({ message: "ok" });
}

module.exports = { uploadMovie };
