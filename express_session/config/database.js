const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URI;

const connection = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  admin: Boolean,
});

const User = connection.model("User", UserSchema);

// Expose the connection
module.exports = connection;
