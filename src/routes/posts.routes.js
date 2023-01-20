const { Router } = require("express");
const router = Router();
const { getPosts } = require("../controllers/posts.controller");



router.get("/", getPosts);





module.exports = router;
