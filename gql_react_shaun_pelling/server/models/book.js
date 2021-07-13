const { Schema, model } = require("mongoose");

const bookSchema = Schema({
  name: String,
  genre: String,
  authorId: String,
});

module.exports = model("Book", bookSchema);
