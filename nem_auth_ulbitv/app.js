const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://fella:fella@node.rspo1.mongodb.net/auth_roles",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(PORT, () => console.log("Server has been started..."));
  } catch (error) {
    console.log(error);
  }
};

start();
