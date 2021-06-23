const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const routes = require("./routes/routes");
const createError = require("http-errors");

const FeedbackService = require("./services/FeedbackService");
const SpeakerService = require("./services/SpeakerService");

const feedbackService = new FeedbackService("./data/feedback.json");
const speakersService = new SpeakerService("./data/speakers.json");

const app = express();

const PORT = 3000;

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["hs79dh92hasd", "adbouyagba933d"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.locals.siteName = "ROUX Meetups";

app.use(express.static(path.join(__dirname, "./static")));

app.use(async (req, res, next) => {
  try {
    const names = await speakersService.getNames();

    res.locals.speakerNames = names;
    // console.log(res.locals);

    return next();
  } catch (error) {
    return next(error);
  }
});

app.use(
  "/",
  routes({
    feedbackService,
    speakersService,
  })
);

/* making error */
app.use((erq, res, next) => {
  return next(createError(404, "File not found"));
});

/* error handling middleware */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.error(err);

  const status = err.status || 500;
  res.locals.status = status;

  res.status(status);
  res.render("error");
});

app.listen(PORT, () => console.log());
