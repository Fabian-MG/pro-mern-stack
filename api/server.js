/* eslint-disable func-names */
require('dotenv').config();
const express = require('express');
const { connectToDB } = require('./db');
const { installHandler } = require('./api_handler');

const port = process.env.API_SERVER_PORT || 3000;

const app = express();
installHandler(app);

const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
console.log('CORS setting:', enableCors);

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
