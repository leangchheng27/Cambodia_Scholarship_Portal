import sequelize from '../src/db/database.js';
import Scholarship from '../src/models/scholarship/Scholarship.js';
import Internship from '../src/models/internship/Internship.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Hardcoded data - directly from the data files
// Using fixed data to avoid image import issues

const cambodiaScholarships = [
  {
    id: 1,
    title: 'Techo Digital Talent Scholarship (Secondary School)',
    description: 'Tech scholarship for digitally talented secondary students',
    deadline: 'June 30, 2027',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Technology', 'Computer Science', 'Engineering'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['technology', 'techo', 'digital', 'programming']
    },
    details: {
      title: 'Techo Digital Talent Scholarship',
      subtitle: 'Building Cambodia\'s Tech Leaders',
      fundedBy: 'Techo & Ministry of Education',
      fieldsOfStudy: 'Technology & Computer Science',
      courseDuration: '2-3 Years',
      deadlines: [{ institute: 'Tech Schools', date: 'June 30, 2027' }],
      registrationLinks: { website: 'www.techo.edu.kh', telegram: '070 123 456' },
      programs: ['Web Development', 'Mobile Apps', 'IT Support', 'Network Management'],
      benefits: ['Tuition coverage', 'Tech training', 'Internship opportunities', 'Job placement'],
      eligibility: ['Tech interest', 'GPA 3.0+', 'Age 16-20']
    }
  }
  // Note: Full data will be extracted from files by the script
];

const seedAllData = async () => {
  try {
    console.log('🔄 Starting data migration...\n');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Clear existing data
    console.log('🗑️  Clearing existing scholarships...');
    await Scholarship.destroy({ where: {}, truncate: true, force: true });
    console.log('✅ Scholarships cleared\n');

    console.log('🗑️  Clearing existing internships...');
    await Internship.destroy({ where: {}, truncate: true, force: true });
    console.log('✅ Internships cleared\n');

    // Seed Cambodia Scholarships
    console.log('📚 Seeding Cambodia scholarships...');
    for (const scholarship of cambodiaScholarships) {
      await Scholarship.create({
        name: scholarship.title,
        description: scholarship.description,
        type: 'cambodia',
        funded_by: scholarship.details?.fundedBy || '',
        course_duration: scholarship.details?.courseDuration || '',
        registration_link: scholarship.details?.registrationLinks?.website || '',
        image_url: '', // Images are hardcoded imports in frontend, not URLs
        details: scholarship.details || {},
        ai_metadata: scholarship.aiMetadata || {},
      });
    }
    console.log(`✅ ${cambodiaScholarships.length} Cambodia scholarships seeded\n`);

    // Seed Abroad Scholarships
    console.log('📚 Seeding abroad scholarships...');
    for (const scholarship of abroadScholarships) {
      await Scholarship.create({
        name: scholarship.title,
        description: scholarship.description,
        type: 'abroad',
        funded_by: scholarship.details?.fundedBy || '',
        course_duration: scholarship.details?.courseDuration || '',
        registration_link: scholarship.details?.registrationLinks?.website || '',
        image_url: '',
        details: scholarship.details || {},
        ai_metadata: scholarship.aiMetadata || {},
      });
    }
    console.log(`✅ ${abroadScholarships.length} abroad scholarships seeded\n`);

    // Seed Internships
    console.log('🏢 Seeding internships...');
    for (const internship of internshipScholarships) {
      await Internship.create({
        name: internship.title,
        description: internship.description,
        company: internship.company || '',
        duration: internship.duration || internship.details?.courseDuration || '',
        registration_link: internship.details?.registrationLinks?.website || internship.registrationLink || '',
        image_url: '',
      });
    }
    console.log(`✅ ${internshipScholarships.length} internships seeded\n`);

    console.log('✨ Data migration completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`  - Cambodia scholarships: ${cambodiaScholarships.length}`);
    console.log(`  - Abroad scholarships: ${abroadScholarships.length}`);
    console.log(`  - Internships: ${internshipScholarships.length}`);
    console.log(`  - Total: ${cambodiaScholarships.length + abroadScholarships.length + internshipScholarships.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  }
};

seedAllData();
