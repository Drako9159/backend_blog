const { Router } = require("express");
const { uploadMovie } = require("../controllers/movies.controller");

const router = Router();

router.post("/private/movies", uploadMovie);

module.exports = router;
