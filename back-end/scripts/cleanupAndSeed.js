import sequelize from '../src/db/database.js';
import Scholarship from '../src/models/scholarship/Scholarship.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to load scholarship data from JS files without image imports
async function loadScholarshipData() {
  // Since cambodiaScholarships.js has image imports that cause issues in Node,
  // we'll create the data directly here with the details we've already created
  
  const cambodiaScholarships = [
    {
      id: 1,
      title: 'Techo Digital Talent Scholarship (Secondary School)',
      description: 'Scholarship for secondary school students in digital and IT fields',
      aiMetadata: {
        studentTypes: ['science'],
        fieldCategories: ['Computer Science', 'Data Science', 'Digital Business', 'Telecommunication', 'Cybersecurity'],
        requiredSubjects: ['Math', 'English'],
        minGPA: 3.0,
        difficultyLevel: 'competitive',
        keywords: ['technology', 'digital', 'IT', 'computer science', 'software engineering', 'data science']
      },
      details: {
        title: 'Opportunities to gain Techo Digital Talent Scholarship',
        subtitle: 'Techo Digital Talent Scholarship 500places Year 2025/2026',
        fundedBy: 'Government of Cambodia',
        fieldsOfStudy: 'Digital Technology, Computer Science, Engineering',
        courseDuration: '4 Year',
        deadlines: [
          { institute: 'CADT/other institutes', date: 'October 22, 2025' },
          { institute: 'AUPP', date: 'October 8, 2025' }
        ],
        registrationLinks: {
          website: 'www.cadt.edu.kh/scholarship',
          telegram: '070 358 623 / 093 366 623'
        },
        programs: [
          'Bachelor of Computer Science in Software Engineering',
          'Bachelor of Telecommunication & Network in Cybersecurity',
          'Bachelor of Digital Business in e-Commerce',
          'Bachelor of Digital Business in Digital Economy',
          'Bachelor of Computer Science in Data Science'
        ],
        benefits: [
          '1 Laptop',
          '100% tuition fee coverage',
          'Good job opportunities and high salary',
          'Support from the Ministry of Education, Youth and Sport for 4 years'
        ],
        eligibility: [
          'Students who pass the 2025 baccalaureate exam (Grades A/B/C)',
          'Exams: Mathematics, Science, English + Interview',
          'Encouragement given to disadvantaged students'
        ]
      }
    }
    // Additional scholarships would be loaded from a JSON file or database
  ];

  return cambodiaScholarships;
}

async function cleanupAndSeed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Manually add JSON columns if they don't exist
    console.log('🔄 Ensuring database columns exist...');
    try {
      await sequelize.query("ALTER TABLE scholarship ADD COLUMN details JSON");
      console.log('✅ Added details column');
    } catch (e) {
      if (!e.message.includes('Duplicate column')) {
        console.log('⚠️  details column already exists or error:', e.message.slice(0, 50));
      }
    }

    try {
      await sequelize.query("ALTER TABLE scholarship ADD COLUMN ai_metadata JSON");
      console.log('✅ Added ai_metadata column');
    } catch (e) {
      if (!e.message.includes('Duplicate column')) {
        console.log('⚠️  ai_metadata column already exists or error:', e.message.slice(0, 50));
      }
    }

    // Update the TYPE enum to include 'internship'
    try {
      await sequelize.query("ALTER TABLE scholarship MODIFY COLUMN type ENUM('cambodia', 'abroad', 'internship') DEFAULT 'cambodia'");
      console.log('✅ Updated type ENUM to include internship');
    } catch (e) {
      if (!e.message.includes('ENUM')) {
        console.log('⚠️  Could not update type ENUM:', e.message.slice(0, 50));
      }
    }

    console.log('🧹 Deleting all scholarships from database...');
    await Scholarship.destroy({ where: {} });
    console.log('✅ All scholarships deleted successfully');

    // Load scholarship data from JSON file if it exists
    const jsonPath = path.join(__dirname, '../back-end/scripts/scholarshipSeedData.json');
    let cambodiaScholarships = [];
    let abroadScholarships = [];

    try {
      if (fs.existsSync(jsonPath)) {
        const seedData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        cambodiaScholarships = seedData.cambodia || [];
        abroadScholarships = seedData.abroad || [];
        console.log(`📁 Loaded scholarship data from JSON file`);
      } else {
        console.log(`⚠️  Scholarship seed data JSON not found, using sample data`);
        const data = await loadScholarshipData();
        cambodiaScholarships = data;
      }
    } catch (err) {
      console.log(`⚠️  Could not load from JSON, using sample data: ${err.message}`);
      const data = await loadScholarshipData();
      cambodiaScholarships = data;
    }

    console.log('\n📚 Seeding Cambodia scholarships...');
    let cambodiaCount = 0;
    for (const scholarship of cambodiaScholarships) {
      await Scholarship.create({
        id: scholarship.id,
        name: scholarship.title,
        description: scholarship.description,
        funded_by: scholarship.details?.fundedBy || null,
        course_duration: scholarship.details?.courseDuration || null,
        registration_link: scholarship.details?.registrationLinks?.website || null,
        image_url: null,
        details: scholarship.details || {},
        ai_metadata: scholarship.aiMetadata || {},
        type: 'cambodia'
      });
      cambodiaCount++;
    }
    console.log(`✅ ${cambodiaCount} Cambodia scholarships seeded`);

    console.log('\n🌍 Seeding Abroad scholarships...');
    let abroadCount = 0;
    for (const scholarship of abroadScholarships) {
      await Scholarship.create({
        id: scholarship.id + 1000,
        name: scholarship.title,
        description: scholarship.description,
        funded_by: scholarship.details?.fundedBy || null,
        course_duration: scholarship.details?.courseDuration || null,
        registration_link: scholarship.details?.registrationLinks?.website || null,
        image_url: null,
        details: scholarship.details || {},
        ai_metadata: scholarship.aiMetadata || {},
        type: 'abroad'
      });
      abroadCount++;
    }
    console.log(`✅ ${abroadCount} Abroad scholarships seeded`);

    console.log('\n🎓 Seeding Internship scholarships...');
    const internships = [
      {
        id: 2001,
        name: 'Tech Internship - Microsoft',
        description: 'Software engineering internship in Phnom Penh',
        funded_by: 'Microsoft Cambodia',
        course_duration: '3-6 months',
        image_url: null,
        registration_link: 'www.microsoft.com/careers',
        type: 'internship',
        details: {
          title: 'Microsoft Tech Internship',
          subtitle: 'Learn cutting-edge technology',
          fundedBy: 'Microsoft Cambodia',
          fieldsOfStudy: 'Computer Science, Engineering',
          courseDuration: '3-6 months',
          deadlines: [{ institute: 'Microsoft', date: 'June 30, 2026' }],
          registrationLinks: { website: 'www.microsoft.com/careers', telegram: '010 XXX XXX' },
          programs: ['Web Development', 'Cloud Computing', 'Data Science'],
          benefits: ['Monthly stipend', 'Mentorship', 'Career guidance'],
          eligibility: ['GPA 3.0+', 'Programming skills', 'English proficiency']
        },
        ai_metadata: {
          studentTypes: ['science'],
          fieldCategories: ['Technology', 'Computer Science'],
          requiredSubjects: ['Math', 'English'],
          minGPA: 3.0,
          difficultyLevel: 'competitive',
          keywords: ['internship', 'tech', 'microsoft', 'programming']
        }
      },
      {
        id: 2002,
        name: 'Business Internship - AEON',
        description: 'Business management internship in Phnom Penh',
        funded_by: 'AEON Cambodia',
        course_duration: '3-6 months',
        image_url: null,
        registration_link: 'www.aeon.com.kh',
        type: 'internship',
        details: {
          title: 'AEON Business Internship',
          subtitle: 'Retail & Business Management',
          fundedBy: 'AEON Cambodia',
          fieldsOfStudy: 'Business Administration, Management',
          courseDuration: '3-6 months',
          deadlines: [{ institute: 'AEON', date: 'May 31, 2026' }],
          registrationLinks: { website: 'www.aeon.com.kh', telegram: '011 XXX XXX' },
          programs: ['Store Management', 'Customer Service', 'Operations'],
          benefits: ['Monthly allowance', 'Work experience', 'Employment opportunity'],
          eligibility: ['GPA 2.8+', 'Communication skills', 'Teamwork ability']
        },
        ai_metadata: {
          studentTypes: ['both'],
          fieldCategories: ['Business', 'Management'],
          requiredSubjects: ['English'],
          minGPA: 2.8,
          difficultyLevel: 'moderate',
          keywords: ['internship', 'business', 'retail', 'aeon']
        }
      },
      {
        id: 2003,
        name: 'NGO Internship - World Vision',
        description: 'Social development internship with World Vision',
        funded_by: 'World Vision Cambodia',
        course_duration: '3-6 months',
        image_url: null,
        registration_link: 'www.wvi.org',
        type: 'internship',
        details: {
          title: 'World Vision Development Internship',
          subtitle: 'Social Impact & Development',
          fundedBy: 'World Vision Cambodia',
          fieldsOfStudy: 'Social Sciences, Development, Community Work',
          courseDuration: '3-6 months',
          deadlines: [{ institute: 'World Vision', date: 'July 15, 2026' }],
          registrationLinks: { website: 'www.wvi.org', telegram: '012 XXX XXX' },
          programs: ['Community Development', 'Project Management', 'Social Research'],
          benefits: ['Monthly stipend', 'Social impact experience', 'Network building'],
          eligibility: ['GPA 2.8+', 'Social awareness', 'Commitment to development']
        },
        ai_metadata: {
          studentTypes: ['both'],
          fieldCategories: ['Social Sciences', 'Development', 'NGO Work'],
          requiredSubjects: ['English'],
          minGPA: 2.8,
          difficultyLevel: 'moderate',
          keywords: ['internship', 'ngo', 'development', 'social', 'world vision']
        }
      }
    ];

    for (const internship of internships) {
      await Scholarship.create(internship);
    }
    console.log(`✅ ${internships.length} Internship scholarships seeded`);

    console.log('\n🎉 All data seeded successfully!');
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    await sequelize.close();
    process.exit(1);
  }
}

cleanupAndSeed();
