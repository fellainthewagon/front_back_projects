const mongoose = require("mongoose");
const Book = require("./book");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

/* if AUTHOR has BOOKs, you can't DELETE him */
authorSchema.pre("remove", function (next) {
  Book.find({ author: this.id }, (error, books) => {
    if (error) {
      next(error);
    } else if (books.length > 0) {
      next(new Error("This author has books still"));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model("Author", authorSchema);
