const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { GraphQLDate } = require('./graphql/scalars');
const { list, add } = require('./issue');

const resolvers = {
  Query: {
    issueList: list,
  },
  Mutation: {
    issueAdd: add,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./graphql/schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
