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
    const response = await readerPosts()
    const data = response.filter((e) => e.language === "spanish\r")
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR_GET_POSTS" });
  }
}

async function getPostsEnglish(req, res) {
  try {
    const response = await readerPosts()
    const data = response.filter((e) => e.language === "english\r")
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR_GET_POSTS" });
  }
}

async function getPost(req, res) {
  try {
    res.json({ data: await readerPost(req.params.id) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR_GET_POST" });
  }
}

module.exports = { getPosts, getPost, getPostsSpanish, getPostsEnglish };
