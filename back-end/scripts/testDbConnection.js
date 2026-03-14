import dotenv from 'dotenv';
dotenv.config();

console.log('Environment variables loaded:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD exists:', !!process.env.DB_PASSWORD);

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // Accept self-signed certificates
      }
    }
  }
);

try {
  await sequelize.authenticate();
  console.log('\n✓ Database connection successful!');
  await sequelize.close();
} catch (err) {
  console.error('\n✗ Database connection failed:', err.message);
  process.exit(1);
}
