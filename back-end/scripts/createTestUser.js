// Script to create a test user directly in the database
require('dotenv').config();
const bcrypt = require('bcrypt');
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

// Test user credentials
const TEST_USER = {
  email: 'test@example.com',
  password: 'Test123456',
  name: 'Test User'
};

async function createTestUser() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Check if user already exists
    const [existing] = await sequelize.query(
      'SELECT * FROM auth_users WHERE email = ?',
      { replacements: [TEST_USER.email] }
    );

    if (existing.length > 0) {
      console.log('❌ Test user already exists!\n');
      console.log('Email:', TEST_USER.email);
      console.log('Password: Test123456');
      console.log('\nYou can login with these credentials.');
      await sequelize.close();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);

    // Insert test user
    await sequelize.query(
      `INSERT INTO auth_users (email, password, name, isVerified, createdAt, updatedAt) 
       VALUES (?, ?, ?, true, NOW(), NOW())`,
      { replacements: [TEST_USER.email, hashedPassword, TEST_USER.name] }
    );

    console.log('✅ Test user created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', TEST_USER.email);
    console.log('🔑 Password:', TEST_USER.password);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('You can now login with these credentials!');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes("Table 'auth_users' doesn't exist")) {
      console.log('\n⚠️  The auth_users table does not exist.');
      console.log('Please make sure your database is set up correctly.');
    }
    
    process.exit(1);
  }
}

createTestUser();
