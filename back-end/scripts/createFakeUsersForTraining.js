/**
 * Script to create fake test users and generate AI training data
 * Creates users with diverse profiles and simulates their scholarship interactions
 * Uses faker to generate realistic random user data
 */

import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

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
        rejectUnauthorized: false // Accept self-signed certificates for DigitalOcean
      }
    }
  }
);

// Define major field combinations for different student types
const SCIENCE_FIELDS = [
  ['Physics', 'Chemistry', 'Mathematics'],
  ['Biology', 'Engineering', 'Computer Science'],
  ['Computer Science', 'Mathematics', 'Physics'],
  ['Civil Engineering', 'Mechanical Engineering', 'Mathematics'],
  ['Medicine', 'Biology', 'Chemistry'],
  ['Electrical Engineering', 'Physics', 'Mathematics'],
  ['Chemical Engineering', 'Chemistry', 'Physics'],
  ['Information Technology', 'Computer Science', 'Mathematics'],
  ['Environmental Science', 'Biology', 'Chemistry'],
  ['Pharmaceutical Science', 'Chemistry', 'Biology']
];

const SOCIETY_FIELDS = [
  ['Business Administration', 'Economics', 'Management'],
  ['Finance', 'Accounting', 'Business'],
  ['History', 'Philosophy', 'Literature'],
  ['Social Sciences', 'Education', 'Psychology'],
  ['Law', 'Political Science', 'Human Rights'],
  ['Marketing', 'Business', 'Communications'],
  ['Public Administration', 'Political Science', 'Management'],
  ['Sociology', 'Psychology', 'Social Sciences'],
  ['International Relations', 'Political Science', 'Economics'],
  ['Human Resources', 'Business', 'Psychology']
];

/**
 * Generate random fake users using faker
 * @param {number} count - Number of users to generate
 * @returns {Array} Array of fake user objects
 */
function generateFakeUsers(count = 10) {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    const name = faker.person.fullName();
    const isScience = Math.random() < 0.5;
    const majorFields = isScience 
      ? SCIENCE_FIELDS[Math.floor(Math.random() * SCIENCE_FIELDS.length)]
      : SOCIETY_FIELDS[Math.floor(Math.random() * SOCIETY_FIELDS.length)];
    
    users.push({
      email: faker.internet.email({ provider: 'gmail.com' }), // Random name + @gmail.com
      name: name,
      gpa: parseFloat((Math.random() * (3.9 - 3.1) + 3.1).toFixed(1)),
      grade: Math.random() < 0.6 ? 12 : 11,
      majorFields: majorFields,
      studentType: isScience ? 'science' : 'society'
    });
  }
  
  return users;
}

// Generate fake users (change 10 to any number you want: 50, 100, 1000, etc.)
const FAKE_USERS = generateFakeUsers(30);

// Simulate user interactions based on their profile
async function simulateUserInteractions(userId, userProfile, sequelize) {
  const actions = ['view', 'click', 'save', 'dismiss'];
  const cambodiaScholarshipIds = Array.from({length: 50}, (_, i) => i + 1);
  const abroadScholarshipIds = Array.from({length: 50}, (_, i) => `abroad_${i + 1}`);
  const internshipIds = Array.from({length: 50}, (_, i) => `internship_${i + 1}`);
  
  const allScholarships = [
    ...cambodiaScholarshipIds.map(id => ({id: id.toString(), type: 'scholarship'})),
    ...abroadScholarshipIds.map(id => ({id, type: 'scholarship'})),
    ...internshipIds.map(id => ({id, type: 'internship'}))
  ];

  const feedbackRecords = [];

  // Simulate interactions: each user interacts with 30-50 scholarships
  const interactionCount = Math.floor(Math.random() * 20) + 30;
  const selected = allScholarships.sort(() => Math.random() - 0.5).slice(0, interactionCount);

  for (const scholarship of selected) {
    // Probability of interaction increases for matching fields
    const isMatch = userProfile.majorFields.some(field => 
      scholarship.id.toLowerCase().includes(field.toLowerCase()) ||
      scholarship.id.toLowerCase().includes(userProfile.studentType)
    );

    // Higher action probability (click/save) for matching scholarships
    let action;
    if (isMatch) {
      // For matching scholarships: 70% click, 30% save
      action = Math.random() < 0.7 ? 'click' : 'save';
    } else {
      // For non-matching: 50% view, 30% click, 10% save, 10% dismiss
      const rand = Math.random();
      if (rand < 0.5) action = 'view';
      else if (rand < 0.8) action = 'click';
      else if (rand < 0.9) action = 'save';
      else action = 'dismiss';
    }

    feedbackRecords.push({
      userId,
      scholarshipId: scholarship.id,
      scholarshipType: scholarship.type,
      action,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Last 30 days
    });
  }

  // Insert feedback records into user_feedback table
  const feedbackQuery = `
    INSERT INTO user_feedback (userId, scholarshipId, scholarshipType, action, score, userProfile, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  // Action score mapping
  const ACTION_SCORES = {
    'view': 1,
    'click': 2,
    'save': 3,
    'apply': 5,
    'dismiss': -2
  };

  for (const record of feedbackRecords) {
    try {
      const score = ACTION_SCORES[record.action] || 1;
      await sequelize.query(feedbackQuery, {
        replacements: [
          record.userId,
          record.scholarshipId,
          record.scholarshipType,
          record.action,
          score,
          JSON.stringify({
            gpa: userProfile.gpa,
            grade: userProfile.grade,
            majorFields: userProfile.majorFields,
            studentType: userProfile.studentType
          })
        ]
      });
    } catch (err) {
      console.error(`Failed to insert feedback for user ${userId}:`, err.message);
    }
  }

  return feedbackRecords.length;
}

async function main() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    console.log('📝 Creating fake users for AI training...\n');

    let totalFeedbackRecords = 0;

    for (const userProfile of FAKE_USERS) {
      try {
        // Check if user already exists
        const [existing] = await sequelize.query(
          'SELECT id FROM users WHERE email = ?',
          { replacements: [userProfile.email] }
        );

        let userId;

        if (existing.length > 0) {
          userId = existing[0].id;
          console.log(`⏭️  User ${userProfile.name} already exists (ID: ${userId})`);
        } else {
          // Hash password
          const hashedPassword = await bcrypt.hash('Test@123456', 10);

          // Insert user into users table
          const [result] = await sequelize.query(
            `INSERT INTO users (email, password, name, isVerified, role, createdAt, updatedAt) 
             VALUES (?, ?, ?, 1, 'user', NOW(), NOW())`,
            { replacements: [userProfile.email, hashedPassword, userProfile.name] }
          );

          userId = result;
          console.log(`✅ Created user: ${userProfile.name} (ID: ${userId})`);
        }

        // Simulate interactions and collect feedback
        const feedbackCount = await simulateUserInteractions(userId, userProfile, sequelize);
        totalFeedbackRecords += feedbackCount;
        console.log(`   → Generated ${feedbackCount} interactions\n`);

      } catch (err) {
        console.error(`❌ Error processing user ${userProfile.name}:`, err.message);
        if (err.original) console.error('   DB Error:', err.original.sqlMessage);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Training data generation complete!');
    console.log('='.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   • Fake users created: ${FAKE_USERS.length}`);
    console.log(`   • Total feedback records: ${totalFeedbackRecords}`);
    console.log(`\n🎯 Next steps:`);
    console.log(`   1. Run: npm run export-training-data`);
    console.log(`   2. This exports user-scholarship pairs for AI fine-tuning`);
    console.log(`   3. Run: python scripts/finetune_model.py`);
    console.log(`   4. The AI model will be fine-tuned on the feedback data\n`);

    await sequelize.close();

  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

main();
