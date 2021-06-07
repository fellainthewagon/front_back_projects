const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");

const app = express();
mongoose.connect(
  "mongodb+srv://fella:fella@nodecrashcourse.rspo1.mongodb.net/articles",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

/* grabing all articles from DB & render to main page */
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles });
});

app.use("/articles", router);
app.listen(3000);
