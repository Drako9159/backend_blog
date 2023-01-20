const { Router } = require("express");
const router = Router();
const fs = require("fs");

const PATH_ROUTES = __dirname;
function removeExtension(fileName) {
  //TODO tracks.js ["tracks", "js"]
  return fileName.split(".").shift();
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file); //TODO index, tracks etc
  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`)); //TODO localhost/api/tracks
  }
});

module.exports = router;
