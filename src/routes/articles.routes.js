const { Router } = require("express");
const { authMiddleware } = require("../middleware/session");

const router = Router();
const {
  getArticles,
  getOneArticle,
} = require("../controllers/articles.controller");

router.get("/articles", authMiddleware, getArticles);

router.get("/articles/:id", authMiddleware, getOneArticle);

module.exports = router;
