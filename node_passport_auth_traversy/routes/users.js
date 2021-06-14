const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* SHOW LOGIN-page */
router.get("/login", (req, res) => {
  res.render("login");
});

/* SHOW REGISTER-page */
router.get("/register", (req, res) => {
  res.render("register");
});

/* REGISTRATION */
router.post("/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "Passwords don' match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "Passwords should be at least 6 characters" });
  }

  if (errors.length) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    try {
      const user = await User.findOne({ email });
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({ name, email, password });

        /* HASH PASSWORD */
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            await newUser.save();

            req.flash("success_msg", "You are now registered");
            res.redirect("/users/login");
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
});

/* LOGIN */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

/* LOGOUT */
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
