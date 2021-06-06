const express = require("express");
const mongoose = require("mongoose");
const User = require("../../devByNinja/nodejs/node-express-jwt/models/User");
const Men = require("./men");

const paginatedResults = require("./middlewere/paginatedResult");
const paginatedResultsDB = require("./middlewere/paginatedResultsDB");

mongoose.connect(
  "mongodb+srv://pagination:pagination@nodecrashcourse.rspo1.mongodb.net/pagination",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.once("open", async () => {
  if ((await Men.countDocuments().exec()) > 0) return;

  Promise.all([
    Men.create({ name: "Fella 1" }),
    Men.create({ name: "Fella 2" }),
    Men.create({ name: "Fella 3" }),
    Men.create({ name: "Fella 4" }),
    Men.create({ name: "Fella 5" }),
    Men.create({ name: "Fella 6" }),
    Men.create({ name: "Fella 7" }),
    Men.create({ name: "Fella 8" }),
    Men.create({ name: "Fella 9" }),
  ]).then(() => console.log("Added all Men"));
});

const app = express();

const users = [
  { id: 1, name: "user 1" },
  { id: 2, name: "user 2" },
  { id: 3, name: "user 3" },
  { id: 4, name: "user 4" },
  { id: 5, name: "user 5" },
  { id: 6, name: "user 6" },
  { id: 7, name: "user 7" },
  { id: 8, name: "user 8" },
  { id: 9, name: "user 9" },
  { id: 10, name: "user 10" },
];

const posts = [
  { id: 1, name: "post 1" },
  { id: 2, name: "post 2" },
  { id: 3, name: "post 3" },
  { id: 4, name: "post 4" },
  { id: 5, name: "post 5" },
  { id: 6, name: "post 6" },
  { id: 7, name: "post 7" },
  { id: 8, name: "post 8" },
  { id: 9, name: "post 9" },
  { id: 10, name: "post 10" },
];

/* V #3 use mongoDB */
app.get("/men", paginatedResultsDB(Men), (req, res) => {
  res.json(res.paginatedResults);
});

/* V #2 use middlewere func paginatedResults*/
app.get("/posts", paginatedResults(posts), (req, res) => {
  res.json(res.paginatedResults);
});

/* V #1 */
app.get("/users", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const start = (page - 1) * limit;
  const end = page * limit;

  const results = {};

  if (end < users.length) {
    results.next = {
      page: page + 1,
      limit,
    };
  }

  if (start > 0) {
    results.prev = {
      page: page - 1,
      limit,
    };
  }

  results.result = users.slice(start, end);
  res.json(results);
});

app.listen(3000);
