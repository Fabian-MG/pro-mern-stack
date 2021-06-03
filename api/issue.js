/* eslint-disable no-param-reassign */
const { UserInputError } = require('apollo-server-express');
const { getDB, getNextSequence } = require('./db');

const list = async () => {
  const db = getDB();
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
};

const validate = (issue) => {
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

const add = async (_, { issue }) => {
  const db = getDB();
  validate(issue);
  issue.created = new Date();
  issue.id = await getNextSequence('issues');
  const result = await db.collection('issues').insertOne(issue);
  const savedIssue = await db
    .collection('issues')
    .findOne({ _id: result.insertedId });
  return savedIssue;
};

module.exports = { list, add };
