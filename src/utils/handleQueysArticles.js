const {
  readerArticles,
  readerContentArticle,
} = require("../libs/readerArticles");

class QuerysArticles {
  static async readerFiles() {
    const getArticles = await readerArticles();
    let data = [...getArticles];
    return data;
  }

  static async queryOneArticle(id) {
    let data = await readerContentArticle(id);
    return data;
  }
  static async querySortByData(data, sort) {
    let getDate = "createdAt";
    if (sort === "+date") {
      data = data.sort((a, b) => {
        if (a[getDate] > b[getDate]) return -1;
        if (a[getDate] < b[getDate]) return 1;
      });
    }
    if (sort === "-date") {
      data = data.sort((a, b) => {
        if (a[getDate] < b[getDate]) return -1;
        if (a[getDate] > b[getDate]) return 1;
      });
    }
    return data;
  }
  static async queryFilterByCategory(data, category) {
    data = data.filter((e) => e.category === `${category}\r`);
    return data;
  }
  static async queryFilterByTag(data, tag) {
    data = data.filter((e) => e.tag === `${tag}\r`);
    return data;
  }
  static async queryFilterByLanguage(data, language) {
    if (language === "spanish") {
      data = data.filter((e) => e.language === "spanish\r");
    }
    if (language === "english") {
      data = data.filter((e) => e.language === "english\r");
    }
    return data;
  }
  static async querySliceLimit(data, limit) {
    data = data.slice(0, limit);
    return data;
  }
  static async querySliceOffsetLimit(data, offset, limit) {
    data = data.slice(offset, limit);
    return data;
  }
}
module.exports = QuerysArticles;
