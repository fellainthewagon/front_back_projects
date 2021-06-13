const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/* SHOW ALL GIGS */
router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.findAll();

    res.render("gigs", { gigs });
  } catch (error) {
    console.log(error);
  }
});

/* SHOW ADD-page */
router.get("/add", (req, res) => res.render("add"));

/* ADD NEW GIG */
router.post("/add", async (req, res) => {
  const gig = checkFields(req.body);

  if (gig.message.length) {
    res.render("add", { gig });
  } else {
    let { title, technologies, description, budget, contact_email } = req.body;

    budget ? (budget = `$${budget}`) : (budget = "Unknown");
    technologies = technologies.toLowerCase().replace(/, /g, ",");

    try {
      await Gig.create({
        title,
        technologies,
        description,
        budget,
        contact_email,
      });

      res.status(200).redirect("/gigs");
    } catch (error) {
      console.log(error);
    }
  }
});

/* SEARCH GIGS & SHOW */
router.get("/search", async (req, res) => {
  let { term } = req.query;
  term = term.toLocaleLowerCase();

  try {
    const gigs = await Gig.findAll({
      where: { technologies: { [Op.like]: `%${term}%` } },
    });

    res.render("gigs", { gigs });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

/* FUNCs */

function checkFields(data) {
  let message = [];
  const { title, technologies, description, contact_email } = data;

  if (!title) message.push({ text: "Please add a title" });
  if (!technologies) message.push({ text: "Please add some technologies" });
  if (!description) message.push({ text: "Please add a description" });
  if (!contact_email) message.push({ text: "Please add a contact email" });

  return { ...data, message };
}

module.exports = router;
