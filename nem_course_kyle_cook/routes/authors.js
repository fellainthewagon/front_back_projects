const express = require("express");
const router = express.Router();
const Author = require("../models/author");

/* Show ALL "{}" or searching AUTHOR "{ name: /bo/i }" */
router.get("/", async (req, res) => {
  let searchOptions = {};

  if (req.query.name) {
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

/* RENDER NEW AUTHOR page */
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

/* CREATE AUTHOR: SUBMIT -> SHOW page with ALL authors */
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

router.get("/:id", (req, res) => {
  res.send("Show Author " + req.params.id);
});

/* RENDER EDIT-page. AFTER edit, click SUBMIT = PUT-method */
router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author });
  } catch (error) {
    res.redirect("/authors");
  }
});

router.put("/:id", (req, res) => {
  res.send("Update Author " + req.params.id);
});

router.delete("/:id", (req, res) => {
  res.send("Delete Author " + req.params.id);
});

module.exports = router;
