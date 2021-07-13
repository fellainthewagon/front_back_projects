const { Schema, model } = require("mongoose");

const authorSchema = Schema({
  name: String,
  age: Number,
});

module.exports = model("Author", authorSchema);
