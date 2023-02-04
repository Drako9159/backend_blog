const {
  querySortByData,
  queryFilterByCategory,
  queryFilterByTag,
  queryFilterByLanguage,
  querySliceLimit,
  querySliceOffsetLimit,
  queryAll,
  queryOneArticle,
} = require("../utils/handleQueysArticles");

async function getOneArticle(req, res) {
  try {
    const findArticle = await queryOneArticle(req.params.id);
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
    console.log(error);
    res
      .header("Content-Type", "application/json; charset=utf-8")
      .status(400)
      .send({ message: "ERROR_GET_POST" });
  }
}

async function getArticles(req, res) {

  try {
    const { sort, language, category, tag, limit, offset } = req.query;
    let data = await queryAll();
    //first order and then filter
    //sort only for date
    if (sort) {
      data = await querySortByData(sort);
    }
    if (language) {
      data = await queryFilterByLanguage(language);
    }
    if (category) {
      data = await queryFilterByCategory(category);
    }
    if (tag) {
      data = await queryFilterByTag(tag);
    }

    if (offset && limit) {
      data = await querySliceOffsetLimit(offset, limit);
    }
    //standard limit 20 but this 10 for best eficient in server
    if (limit && limit < 10) {
      data = querySliceLimit(limit);
    }
    res
      .header("Content-Type", "application/json; charset=utf-8")
      .status(200)
      .send({ data: data });
  } catch (error) {
    res
      .header("Content-Type", "application/json; charset=utf-8")
      .status(500)
      .send({ message: "ERROR_GET_POSTS" });
  }
}

module.exports = {
  getArticles,
  getOneArticle,
 
};
