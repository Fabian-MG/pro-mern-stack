const express = require("express");
const fs = require("fs");

const { ApolloServer } = require("apollo-server-express");

let aboutMessage = "Issue Tracker API v1.0";

const resolvers = {
  Query: {
    about: () => aboutMessage,
  },
  //mutation(obj, args, context, info);
  Mutation: {
    setAboutMessage: (_, { message }) => (aboutMessage = message),
  },
};

const app = express();
app.use(express.static("public"));

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"),
  resolvers,
});
server.applyMiddleware({ app, path: "/graphql" });

app.listen(3000, function () {
  console.log("App started on port 3000");
});
