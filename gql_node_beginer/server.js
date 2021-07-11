const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const app = express();

const authors = [
  { id: 1, name: "J.K.Rowling" },
  { id: 2, name: "J.R.R.Tolkien" },
  { id: 3, name: "B.Weeks" },
];

const books = [
  { id: 1, name: "HP and the Chamber of Secrets", authorId: 1 },
  { id: 2, name: "HP and the Prisoner of Azkaban", authorId: 1 },
  { id: 3, name: "The Fellowship of the Ring", authorId: 2 },
  { id: 4, name: "The Two Towers", authorId: 2 },
  { id: 5, name: "The way of Shadows", authorId: 3 },
  { id: 6, name: "Beyond the Shadows", authorId: 3 },
];

/**
 * types
 */

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    authorId: {
      type: GraphQLNonNull(GraphQLInt),
    },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

/**
 * queries
 */

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
  }),
});

/**
 * mutations
 */

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        authorId: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (parent, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        };
        authors.push(author);
        return author;
      },
    },
  }),
});

/**
 * schema
 */

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("go"));
