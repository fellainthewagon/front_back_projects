const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

const url =
  "mongodb+srv://fella:fella@node.rspo1.mongodb.net/gql_books_authors?retryWrites=true&w=majority";

function start() {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("DB connected")
  );
  app.listen(3000, () => console.log("Server started"));
}

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

start();
