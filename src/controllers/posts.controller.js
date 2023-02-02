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



module.exports = { getPosts, getPost, getPostsSpanish, getPostsEnglish };
