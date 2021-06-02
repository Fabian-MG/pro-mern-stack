/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const fs = require('fs');
require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLDate } = require('./graphql/scalars');

const port = process.env.API_SERVER_PORT || 3000;
const dbURI = process.env.DB_URL
  || 'mongodb+srv://test_user:test123@pro-mern-stack.cqk1y.mongodb.net/issue-tracker?retryWrites=true&w=majority';
let db;

const app = express();

const connectToDB = async () => {
  const client = new MongoClient(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log('Connected to MongoDB at ', dbURI);
  db = client.db();
};

const getNextSequence = async (name) => {
  const result = await db
    .collection('counters')
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false },
    );
  return result.value.current;
};

const validateIssue = (issue) => {
  const errors = [];

  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }

  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
};

const resolvers = {
  Query: {
    issueList: async () => {
      const issues = await db.collection('issues').find({}).toArray();
      return issues;
    },
  },
  Mutation: {
    issueAdd: async (_, { issue }) => {
      validateIssue(issue);
      issue.created = new Date();
      issue.id = await getNextSequence('issues');
      const result = await db.collection('issues').insertOne(issue);
      const savedIssue = await db
        .collection('issues')
        .findOne({ _id: result.insertedId });
      return savedIssue;
    },
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

const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
console.log('CORS setting:', enableCors);

server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

(async function () {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
