const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");

class AuthController {
  /* * * * * * * * REGISTRATION */

  async registration(req, res) {
    try {
      /* check validation errors */
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({ message: "Registration error", err });
      }

      const { username, password } = req.body;
      const isExist = await User.findOne({ username });
      if (isExist) {
        return res
          .status(400)
          .json({ message: "A user with the same name already exist" });
      }

      const hashed = bcrypt.hashSync(password, 7);

      /* set role */
      const userRole = await Role.findOne({ value: "user" });

      const user = new User({
        username,
        password: hashed,
        roles: [userRole.value],
      });
      await user.save();

      return res.json({ message: "User successfully registered" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Registration error" });
    }
  }

  /* * * * * * * * LOGIN */

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} is not found` });
      }

      const isValidated = bcrypt.compareSync(password, user.password);
      if (!isValidated) {
        return res.status(400).json({ message: "Password is incorrect" });
      }

      /* generate token */
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Login error" });
    }
  }

  /* * * * * * * * SHOW ALL USERS */

  async getUsers(req, res) {
    try {
      const users = await User.find({});

      res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Users nor found" });
    }
  }
}

/* * * * * * * * * * * * FUNCs */

/* generate JWT */
function generateAccessToken(id, roles) {
  const payload = { id, roles };

  return jwt.sign(payload, secret, { expiresIn: "12h" });
}

module.exports = new AuthController();
