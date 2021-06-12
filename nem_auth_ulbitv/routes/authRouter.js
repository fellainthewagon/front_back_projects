const Router = require("express");
const router = Router();
const AuthController = require("../controllers/authController");
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

router.post(
  "/registration",
  [
    check("username", "Username cannot be empty").notEmpty(),
    check(
      "password",
      "Password must be more than 4 and less than 10 characters"
    ).isLength({ min: 4, max: 10 }),
  ],
  AuthController.registration
);

router.post("/login", AuthController.login);

router.get("/users", isAdmin(["admin"]), AuthController.getUsers);

/* * * * * * * * * FUNCS * * * * * * * * * * */

/* access only authorized users*/
function hasAccess(req, res, next) {
  if (req.method === "OPTIONS") next();

  try {
    /* get token from headers */
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "User is not authorized" });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "User is not authorized" });
  }
}

/* access admin */
function isAdmin(roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") next();

    try {
      /* get token from headers */
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "User is not authorized" });
      }

      const { roles: userRoles } = jwt.verify(token, secret);

      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: "You don't have access" });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "User is not authorized" });
    }
  };
}

module.exports = router;
