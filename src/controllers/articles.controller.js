const { handleError } = require("../utils/handleError");
const QuerysArticles = require("../utils/handleQueysArticles");

async function getOneArticle(req, res) {
  try {
    const findArticle = await QuerysArticles.queryOneArticle(req.params.id);
    if (findArticle === "NOT_POST") {
      res
        .header("Content-Type", "application/json; charset=utf-8")
        .status(400)
        .send({ message: "NOT_POST_FOUND" });
    } else {
      res
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ data: findArticle });
    }
  } catch (error) {
    handleError(res, "ERROR_GET_POST", 400);
  }
}

async function getArticles(req, res) {
  try {
    const { sort, language, category, tag, limit, offset } = req.query;
    let data = await QuerysArticles.readerFiles();
    //first order and then filter
    //sort available for date
    if (sort) {
      data = await QuerysArticles.querySortByData(data, sort);
    }
    //filter for language article
    if (language) {
      data = await QuerysArticles.queryFilterByLanguage(data, language);
    }
    //filter by category
    if (category) {
      data = await QuerysArticles.queryFilterByCategory(data, category);
    }
    //filter by tag
    if (tag) {
      data = await QuerysArticles.queryFilterByTag(data, tag);
    }
    //standard limit 20 but this 10 for best eficient in server
    if (offset && limit <= 10) {
      data = await QuerysArticles.querySliceOffsetLimit(data, offset, limit);
    }
    //this send only first 10 items
    if (limit <= 10) {
      data = await QuerysArticles.querySliceLimit(data, limit);
    }
    //limiter default
    data = await QuerysArticles.querySliceLimit(data, 10);
    res
      .header("Content-Type", "application/json; charset=utf-8")
      .status(200)
      .send({ data: data });
  } catch (error) {
    handleError(res, "ERROR_GET_POSTS", 500);
  }
}

module.exports = {
  getArticles,
  getOneArticle,
};
