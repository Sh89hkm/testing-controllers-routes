const mongoose = require('mongoose');

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  TEST_DB_HOST,
  DB_PORT,
  DB_NAME,
  IS_JEST,
} = process.env;

const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
const TEST_DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${TEST_DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

let url = IS_JEST ? TEST_DB_URI : DB_URI;

const connectToMongo = () => {
  mongoose.connect(url, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Database connected: ', url);
  });

  db.on('error', (err) => {
    console.error('Database connection error: ', err);
  });
};

module.exports = connectToMongo;
