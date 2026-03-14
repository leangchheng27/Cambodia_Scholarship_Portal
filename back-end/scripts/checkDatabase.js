import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
);

try {
  await sequelize.authenticate();
  console.log('✅ Connected to:', process.env.DB_NAME);
  
  // Get all tables
  const [tables] = await sequelize.query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'csp_db'`);
  
  console.log('\n📊 Tables in csp_db:');
  tables.forEach(t => console.log('  -', t.TABLE_NAME));
  
  // Check for user data
  const [users] = await sequelize.query(`SELECT COUNT(*) as count FROM auth_users`).catch(() => [[{count: 'error'}]]);
  console.log('\n👥 Users in auth_users:', users[0]?.count || 'Table not found');
  
  await sequelize.close();
} catch (err) {
  console.error('❌ Error:', err.message);
}
