const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          /* match user */
          const user = await User.findOne({ email });
          if (!user)
            return done(null, false, {
              message: "That email is not registered",
            });

          /* match password */
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            isMatch
              ? done(null, user)
              : done(null, false, { message: "Password is incorrect" });
          });
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
