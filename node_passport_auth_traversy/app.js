const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const router = require("./routes/index");
const routerUsers = require("./routes/users");

const app = express();
const db = require("./config/keys").MongoURI;
require("./config/passport")(passport);

const PORT = process.env.PORT || 5000;

/* EJS */
app.use(expressLayouts);
app.set("view engine", "ejs");

/* BODY PARSER */
app.use(express.urlencoded({ extended: false }));

/* EXPRESS SESSION */
app.use(
  session({
    secret: "97sf873g-hfe87wy3b",
    resave: true,
    saveUninitialized: true,
  })
);

/* PASSPORT MIDDLEWARE !important set this after EXPRESS SESSION */
app.use(passport.initialize());
app.use(passport.session());

/* CONNECT FLASH */
app.use(flash());

/* GLOBAL VARs */
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

/* ROUTES */
app.use("/", router);
app.use("/users", routerUsers);

/* START */
async function start() {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("DB connected")
    );

    app.listen(PORT, () => console.log("Server has been started"));
  } catch (error) {
    console.log(error);
  }
}
start();
