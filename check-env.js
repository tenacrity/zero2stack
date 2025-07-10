import dotenv from 'dotenv';
dotenv.config();

console.log('DB_PASS:', process.env.DB_PASS);
console.log('Type:', typeof process.env.DB_PASS);