const express = require("express");
const Todo = require("../models/todo");

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find({});

  res.render("index", {
    title: "Home Todo",
    isHome: true,
    todos,
  });
});

router.get("/new", (req, res) => {
  res.render("new", {
    title: "New Todo",
    isNew: true,
  });
});

router.post("/new", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  await todo.save();

  res.redirect("/");
});

module.exports = router;
