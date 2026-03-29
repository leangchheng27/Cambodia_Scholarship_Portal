/**
 * Seed Majors into Database
 * Run with: node scripts/seedMajors.js
 */

import dotenv from 'dotenv';
import sequelize from '../src/db/database.js';
import Major from '../src/models/major/Major.js';

dotenv.config();

const MAJORS = [
  { title: 'IT & Computer Science', description: 'Master software, AI, and digital systems', stream: 'science' },
  { title: 'Engineering', description: 'Build infrastructure and technical systems', stream: 'science' },
  { title: 'Health & Medical Sciences', description: 'Healthcare, medicine, and life sciences', stream: 'science' },
  { title: 'Agriculture & Environmental', description: 'Farming, ecology, and environmental protection', stream: 'science' },
  { title: 'Architecture & Urban Planning', description: 'Design buildings and cities', stream: 'science' },
  { title: 'Business & Economics', description: 'Lead in business, finance, and economics', stream: 'social' },
  { title: 'Education', description: 'Shape the next generation of learners', stream: 'social' },
  { title: 'Arts & Media', description: 'Creative arts, design, and media production', stream: 'social' },
  { title: 'Law & Legal Studies', description: 'Study law, justice, and governance', stream: 'social' },
  { title: 'Social Sciences', description: 'Understand society, politics, and human behavior', stream: 'social' },
  { title: 'Tourism & Hospitality', description: 'Travel, tourism, and hospitality management', stream: 'social' },
  { title: 'Languages & Literature', description: 'Master languages, linguistics, and literature', stream: 'social' },
];

async function seedMajors() {
  try {
    console.log('🌱 Starting to seed majors...');
    
    // Sync database
    await sequelize.sync();
    console.log('✅ Database synced');

    // Check if majors already exist
    const existingCount = await Major.count();
    if (existingCount > 0) {
      console.log(`⚠️  Database already has ${existingCount} majors. Skipping seed.`);
      process.exit(0);
    }

    // Insert majors
    await Major.bulkCreate(MAJORS);
    console.log(`✅ Successfully seeded ${MAJORS.length} majors`);

    // Verify
    const allMajors = await Major.findAll();
    console.log('\n📚 All majors:');
    allMajors.forEach((major, index) => {
      console.log(`   ${index + 1}. ${major.title} (${major.stream})`);
    });

    console.log('\n✨ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedMajors();
