const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const db = require("./config/database");
const routeGigs = require("./routes/routeGigs");

const app = express();
const PORT = process.env.PORT || 5000;

/* hbs */
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));

/* static */
app.use(express.static(path.join(__dirname, "public")));

/* * * MAIN PAGE * * */
app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});

/* routes */
app.use("/gigs", routeGigs);

/* * * CONNECT TO DB * * */

async function connectToDB() {
  try {
    await db.authenticate();
    console.log("DB connected!");
  } catch (error) {
    console.log(error);
  }
}
connectToDB();

/* * * START SERVER * * */

function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
