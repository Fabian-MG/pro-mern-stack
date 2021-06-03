require('dotenv').config();
const { MongoClient } = require('mongodb');

const dbURI = process.env.DB_URL
|| 'mongodb+srv://test_user:test123@pro-mern-stack.cqk1y.mongodb.net/issue-tracker?retryWrites=true&w=majority';
let db;

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

const getDB = () => db;

module.exports = {
  connectToDB,
  getNextSequence,
  getDB,
};
