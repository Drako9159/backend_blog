//const { readerPosts } = require("../utils/posts")

const fs = require("fs/promises");
const path = require("path");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt({ html: true });

async function getPosts(req, res) {
  try {
    res.json({ data: readerPosts() });
  } catch (error) {
    console.log(error);
    res.status(500).send({ messgae: "Error" });
  }
}
function readerPosts() {
  fs.readdir(path.join("src/posts"))
    .then(async (files) => {
      const data = [];
      for await (const file of files) {
        const text = await fs.readFile(path.join("src/posts", file), "utf-8");
        const header = Extra(text);
        data.push(header);
      }
      if (data.length === 0) {
        return "No Posts";
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

function Extra(fileText) {
  const headers = /(?<=-{3})([\w\s:"',{}/.-])*(?=-{3})/gm;
  let data;
  try {
    data = headers.exec(fileText.trim());
  } catch (e) {
    throw new Error("ivalid header or not fount");
  }
  const parse = data[0].trim();
  const dataFilter = parse.split("\n").filter(Boolean);
  const abs = {};
  dataFilter.forEach((line) => {
    const [key, value, more] = line.split(":");
    if (more) {
      abs[key] = value + ":" + more;
      return abs[key];
    }
    abs[key] = value;
    return abs[key];
  });
  return abs;
}

module.exports = { getPosts };
