const { readerPosts, readerPost } = require("../utils/posts");

async function getPosts(req, res) {
  try {
    res.json({ data: await readerPosts() });
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

module.exports = { getPosts, getPost };
