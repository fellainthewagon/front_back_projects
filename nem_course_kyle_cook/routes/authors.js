const express = require("express");
const router = express.Router();
const Author = require("../models/author");

/* all authors route */
router.get("/", async (req, res) => {
  let searchOptions = {};

  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
    // console.log(searchOptions); --> /* { name: /bo/i } */
  }

  try {
    const authors = await Author.find(searchOptions);

    res.render("authors/index", {
      authors,
      searchOptions: req.query,
    });
  } catch (error) {
    res.redirect("/");
  }
});

/* new authors route */
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

/* create autor route, after submit form opened page "..3000/autors" */
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch (err) {
    res.render("authors/new", {
      author,
      errorMessage: "Error creating Author...",
    });
  }
});

module.exports = router;
