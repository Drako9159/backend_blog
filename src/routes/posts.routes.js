const { Router } = require("express");
const router = Router();
const {
  getPosts,
  getPost,
  getPostsSpanish,
  getPostsEnglish,
} = require("../controllers/posts.controller");

router.get("/", getPosts);

router.get("/spanish", getPostsSpanish);

router.get("/english", getPostsEnglish);

router.get("/:id", getPost);

module.exports = router;
