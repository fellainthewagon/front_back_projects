const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");

const routes = require("./routes/todos");

const PORT = process.env.PORT || 3000;
const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://fella:fella@node.rspo1.mongodb.net/todos",
      {
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    app.listen(PORT, () => {
      console.log("Server has been started...");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
