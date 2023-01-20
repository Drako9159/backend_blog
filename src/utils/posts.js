const fs = require("fs/promises");
const path = require("path");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt({ html: true });

async function readerPosts() {
  return await fs
    .readdir(path.join("src/storage/posts"))
    .then(async (files) => {
      const data = [];
      for await (const file of files) {
        const text = await fs.readFile(
          path.join("src/storage/posts", file),
          "utf-8"
        );
        const header = Extra(text);
        data.push(header);
      }
      if (data.length === 0) {
        return "NOT_POSTS";
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}
async function readerPost(filename) {
  return await fs
    .readFile(path.join("src/storage/posts", `${filename}.md`))
    .then((data) => {
      try {
        const dataHTML = md.render(
          data.toString().replace(/-{3}([\w\s:"',{}/.-])*-{3}/gm, "")
        );
        return dataHTML;
      } catch (err) {
        console.log(err);
        return "NOT_POST";
      }
    })
    .catch((err) => {
      console.log(err);
      return "NOT_POST";
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
module.exports = { readerPosts, readerPost };
