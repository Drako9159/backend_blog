const { Router } = require("express");
const { authMiddleware } = require("../middleware/session");

const router = Router();
const {
  getPosts,
  getPost,
  getPostsSpanish,
  getPostsEnglish,
  getArticles,
} = require("../controllers/posts.controller");

router.get("/posts/spanish", authMiddleware, getPostsSpanish);

router.get("/posts/english", authMiddleware, getPostsEnglish);

router.get("/posts/all", authMiddleware, getPosts);

router.get("/posts/:id", authMiddleware, getPost);
// instace for version 2
//router.get("/v2/articles", getArticles);
/*
const employees = [
  { firstName: "William", lastName: "Smith", age: 20 },
  { firstName: "Zucarit", lastName: "Bolivar", age: 30 },
  { firstName: "Antonio", lastName: "Klamer", age: 50 },
  { firstName: "Laura", lastName: "Altamir", age: 10 },
  { firstName: "Isabella", lastName: "Zurita", age: 5 },
];
//http://example.com/articles?sort=+author,-datepublished
//http://exaple.com/employees?lastName=Smith&age=30
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.get("/employees", (req, res) => {
  const { firstName, lastName, age, sort } = req.query;
  let results = [...employees];
  if (firstName) {
    results = results.filter((r) => r.firstName === firstName);
  }
  if (lastName) {
    results = results.filter((r) => r.lastName === lastName);
  }
  if (age) {
    results = results.filter((r) => +r.age === +age);
  }
  if (sort) {
    function libraryOrder(sort) {
      const reallibs = {
        firstname: "firstName",
        lastname: "lastName",
        age: "age",
      };
      return reallibs[sort];
    }

    function order(sort, order) {
      let getItem = libraryOrder(sort);
      if (order === "asc") {
        results.sort((a, b) => {
          if (a[getItem] < b[getItem]) return -1;
          if (a[getItem] > b[getItem]) return 1;
        });
      }
      if (order === "dec") {
        results.sort((a, b) => {
          if (a[getItem] > b[getItem]) return -1;
          if (a[getItem] < b[getItem]) return 1;
        });
      }
    }

    order(sort, "asc");
  }

  res.json(results);
});
*/
module.exports = router;
