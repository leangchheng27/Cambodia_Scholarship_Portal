// Script to check existing users in the database
require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('../src/config');

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
);

async function checkUsers() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    const [users] = await sequelize.query('SELECT id, email, name, isVerified FROM auth_users');
    
    if (users.length === 0) {
      console.log('❌ No users found in the database.\n');
      console.log('You need to register a new account using the registration form.');
    } else {
      console.log(`✅ Found ${users.length} user(s):\n`);
      users.forEach(user => {
        console.log(`  Email: ${user.email}`);
        console.log(`  Name: ${user.name || 'Not set'}`);
        console.log(`  Verified: ${user.isVerified ? 'Yes ✓' : 'No ✗'}`);
        console.log('  ---');
      });
    }
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
