const { readerPosts, readerPost } = require("../utils/posts");

async function getPosts(req, res) {
  try {
    res.json({ data: await readerPosts() });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR_GET_POSTS" });
  }
}

async function getPostsSpanish(req, res) {
  try {
    const response = await readerPosts();
    const data = response.filter((e) => e.language === "spanish\r");
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR_GET_POSTS" });
  }
}

async function getPostsEnglish(req, res) {
  try {
    const response = await readerPosts();
    const data = response.filter((e) => e.language === "english\r");
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR_GET_POSTS" });
  }
}

async function getPost(req, res) {
  try {
    const findPost = await readerPost(req.params.id);
    if (findPost === "NOT_POST") {
      res.status(400).send({ message: "NOT_POST_FOUND" });
    } else {
      res.json({ data: findPost });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "ERROR_GET_POST" });
  }
}

async function getArticles(req, res) {
  try {
    const { sort, language, type, category, tag, limit, offset } = req.query;
    const readArticles = await readerPosts();
    let data = [...readArticles];

    //default limit 10
    data = data.slice(0, 10);

    //first order and then filter
    //sort only for date
    if (sort) {
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
    }

    if (type) {
      data = data.filter((e) => e.type === `${type}\r`);
    }
    if (language) {
      if (language === "spanish") {
        data = data.filter((e) => e.language === "spanish\r");
      }
      if (language === "english") {
        data = data.filter((e) => e.language === "english\r");
      }
    }
    if (category) {
      data = data.filter((e) => e.language === `${category}\r`);
    }
    if (tag) {
      data = data.filter((e) => e.language === `${tag}\r`);
    }

    if (offset && limit) {
      data = data.slice(offset, limit);
    }
    //standard limit 20 but this 10 for best eficient in server
    if (limit && limit < 10) {
      data = data.slice(0, limit);
    }

    res
      .header("Content-Type", "application/json; charset=utf-8")
      .json({ data: data });
  } catch (error) {
    res.status(500).send({ message: "ERROR_GET_POSTS" });
  }
}

module.exports = {
  getArticles,
  getPosts,
  getPost,
  getPostsSpanish,
  getPostsEnglish,
};
