import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

const seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

try {
  // Get the fake users
  const [users] = await seq.query('SELECT id, email, name, role, isVerified, createdAt FROM users WHERE id >= 17 ORDER BY id LIMIT 3');
  
  console.log('\n👥 FAKE USERS PROFILE DATA:\n');
  
  users.forEach(u => {
    console.log(`  👤 ${u.name}`);
    console.log(`     Email: ${u.email}`);
    console.log(`     User ID: ${u.id}`);
    console.log(`     Role: ${u.role}`);
    console.log(`     Verified: ${u.isVerified ? 'Yes' : 'No'}`);
    console.log('');
  });

  // Get sample feedback with embedded profile
  const [feedbacks] = await seq.query(`
    SELECT uf.userId, uf.action, uf.scholarshipType, uf.score, uf.userProfile, u.name
    FROM user_feedback uf
    JOIN users u ON uf.userId = u.id
    WHERE uf.userId >= 17
    LIMIT 5
  `);

  console.log('\n📊 EMBEDDED PROFILE IN FEEDBACK RECORDS:\n');
  feedbacks.forEach(f => {
    const profile = JSON.parse(f.userProfile);
    console.log(`  User: ${f.name} (ID: ${f.userId})`);
    console.log(`    GPA: ${profile.gpa}`);
    console.log(`    Grade: ${profile.grade}`);
    console.log(`    Student Type: ${profile.studentType}`);
    console.log(`    Major Fields: ${profile.majorFields.join(', ')}`);
    console.log(`    Action: ${f.action} (Score: ${f.score}) on ${f.scholarshipType}`);
    console.log('');
  });

  await seq.close();
} catch (err) {
  console.error('Error:', err.message);
}
