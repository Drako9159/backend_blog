const { Router } = require("express");
const { authMiddleware } = require("../middleware/session")

const router = Router();
const {
  getPosts,
  getPost,
  getPostsSpanish,
  getPostsEnglish,
  
} = require("../controllers/posts.controller");

router.get("/posts/spanish", authMiddleware, getPostsSpanish);

router.get("/posts/english", authMiddleware, getPostsEnglish);

router.get("/posts/all", getPosts);

router.get("/posts/:id", getPost);


module.exports = router;
