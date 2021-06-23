const express = require("express");
const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get("/", async (req, res, next) => {
    // if (!req.session.visitcount) {
    //   req.session.visitcount = 0;
    // }
    // req.session.visitcount += 1;
    // console.log(`Number of visit count: ${req.session.visitcount}`);

    try {
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();

      return res.render("layout", {
        pageTitle: "Welcome",
        template: "index",
        topSpeakers,
        artwork,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.use("/speakers", speakersRoute(params));
  router.use("/feedback", feedbackRoute(params));

  return router;
};
