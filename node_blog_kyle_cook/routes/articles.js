const express = require("express");
const router = express.Router();
const Article = require("./../models/article");

/* click "New article" */
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

/* after click "New article" -> CREATE, SAVE it to DB & SHOW IT  */
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();

    next();
  },
  saveArticleAndRedirect("new")
);

/* click "EDIT" -> FIND article in DB & FILL FORM info (then POST) */
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);

  res.render("articles/edit", { article });
});

/* click "SAVE" -> PUT edit article to DB & SHOW IT */
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);

    next();
  },
  saveArticleAndRedirect("edit")
);

/* SHOW ARTICLE (before FIND article in DB) */
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });

  if (article == null) res.redirect("/");

  res.render("articles/show", { article });
});

/* DELETE ARTICLE */
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);

  res.redirect("/");
});

/* FUNC for POST and PUT */
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;

    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (error) {
      res.render(`articles/${path}`, { article });
    }
  };
}

module.exports = router;
