const path = require('path');
const dotenv = require('dotenv');

// Force load .env file from root directory
const envPath = path.resolve(__dirname, '../.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

// Debug to confirm values
console.log("DB_USER from .env:", process.env.DB_USER);
console.log("DB_PASSWORD from .env:", process.env.DB_PASSWORD);
console.log("DB_NAME from .env:", process.env.DB_NAME);
console.log("DB_HOST from .env:", process.env.DB_HOST);

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "", // must be a string
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
};
