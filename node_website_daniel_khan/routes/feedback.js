const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const validations = [
  check("name").trim().isLength({ min: 3 }).escape().withMessage("A name is required"),
  check("email").trim().isEmail().normalizeEmail().withMessage("A valid email address is required"),
  check("title").trim().isLength({ min: 5 }).escape().withMessage("A title is required"),
  check("message").trim().isLength({ min: 10 }).escape().withMessage("A message is required"),
];

module.exports = (params) => {
  const { feedbackService } = params;

  router.get("/", async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();

      /* grab errors/success message and send them to rendering, reset session */
      const errors = req.session.feedback ? req.session.feedback.errors : false;
      const success = req.session.feedback ? req.session.feedback.message : false;

      req.session.feedback = {};

      return res.render("layout", {
        pageTitle: "Feedback",
        template: "feedback",
        feedback,
        errors,
        success,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.post("/", validations, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.feedback = { errors: errors.array() };
      return res.redirect("/feedback");
    }

    try {
      const { name, email, title, message } = req.body;
      await feedbackService.addEntry(name, email, title, message);

      req.session.feedback = {
        message: "Thank you for your feedback!",
      };

      return res.redirect("/feedback");
    } catch (error) {
      return next();
    }
  });

  /* test API verbs */
  router.post("/api", validations, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    try {
      const { name, email, title, message } = req.body;
      await feedbackService.addEntry(name, email, title, message);

      const feedback = await feedbackService.getList();

      return res.json({ feedback, successMessage: "Thank you for your feedback!" });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};