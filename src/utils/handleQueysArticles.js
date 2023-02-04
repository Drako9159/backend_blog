const {
  readerArticles,
  readerContentArticle,
} = require("../libs/readerArticles");

async function readerFiles() {
  const getArticles = await readerArticles();
  let data = [...getArticles];
  return data;
}


async function queryAll() {
  let data = await readerFiles();
  data = data.slice(0, 10);
  return data;
}
async function queryOneArticle(id) {
  let data = await readerContentArticle(id);
  console.log(data)
  return data;
}

async function querySortByData(sort) {
  let data = await readerFiles();
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
async function queryFilterByCategory(category) {
  let data = await readerFiles();
  data = data.filter((e) => e.category === `${category}\r`);
  return data;
}
async function queryFilterByTag(tag) {
  let data = await readerFiles();
  data = data.filter((e) => e.tag === `${tag}\r`);
  return data;
}
async function queryFilterByLanguage(language) {
  let data = await readerFiles();
  if (language === "spanish") {
    data = data.filter((e) => e.language === "spanish\r");
  }
  if (language === "english") {
    data = data.filter((e) => e.language === "english\r");
  }
  return data;
}
async function querySliceLimit(limit) {
  let data = await readerFiles();
  data = data.slice(0, limit);
  return data;
}
async function querySliceOffsetLimit(offset, limit) {
  let data = await readerFiles();
  data = data.slice(offset, limit);
  return data;
}

module.exports = {
  querySortByData,
  queryFilterByCategory,
  queryFilterByTag,
  queryFilterByLanguage,
  querySliceLimit,
  querySliceOffsetLimit,
  queryAll,
  queryOneArticle
};
