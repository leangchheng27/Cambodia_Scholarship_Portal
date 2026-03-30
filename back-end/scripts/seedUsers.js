// Script to seed users and admin with faker data
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import sequelize from '../src/db/database.js';
import AuthUserModel from '../src/models/auth/AuthUser.js';

const AuthUser = AuthUserModel(sequelize);

// Subject mappings from GradeEntryForm
const SCIENCE_SUBJECTS = ['Math', 'Biology', 'Khmer Literature', 'Physics', 'Chemistry', 'History', 'English'];
const SOCIETY_SUBJECTS = ['Math', 'History', 'Khmer Literature', 'Geography', 'Morality', 'Earth Science', 'English'];

const GRADES = ['A', 'B', 'C', 'D', 'E', 'F'];
const ACADEMIC_TYPES = ['science', 'society'];
const EDUCATION_LEVELS = ['High School Student', 'College/University Student', 'Graduate Student', 'Other'];
const UNIVERSITY_FIELDS = [
  'Computer Science',
  'Engineering',
  'Business Administration',
  'Medicine',
  'Law',
  'Economics',
  'Education',
  'Agriculture',
  'Architecture',
  'Pharmacy',
  'Nursing',
  'Psychology',
  'Accounting',
  'Marketing',
];

const generateRandomGrades = (academicType) => {
  const subjects = academicType === 'science' ? SCIENCE_SUBJECTS : SOCIETY_SUBJECTS;
  const grades = {};
  subjects.forEach(subject => {
    grades[subject] = faker.helpers.arrayElement(GRADES);
  });
  return grades;
};

const seedUsers = async () => {
    try {
        await sequelize.sync();

        // Drop all existing users
        console.log('🗑️  Dropping all existing users...');
        await AuthUser.destroy({ where: {}, truncate: true });
        console.log('✅ All users dropped');

        // Create admin user from .env
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@csp.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

        await AuthUser.create({
            email: adminEmail,
            password: adminPassword,
            name: 'Administrator',
            role: 'admin',
            isVerified: true,
            nationality: 'Cambodian',
            profileType: 'admin',
            studentType: 'student',
            academicType: 'science',
            educationLevel: 'university',
            universityField: 'Administration',
            grades: null,
            interests: null,
        });
        console.log('✅ Admin user created');

        // Generate 100 regular users with complete profile data
        const numberOfUsers = 100;
        const usersToCreate = [];

        for (let i = 0; i < numberOfUsers; i++) {
            const educationLevel = faker.helpers.arrayElement(EDUCATION_LEVELS);
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            
            let userData = {
                email: faker.internet.email({ firstName, lastName, provider: 'gmail.com' }).toLowerCase(),
                password: 'User@123456',
                name: `${firstName} ${lastName}`,
                role: 'user',
                isVerified: true,
                nationality: 'Cambodian',
                profileType: 'student',
                studentType: 'student',
                educationLevel: educationLevel,
                interests: null,
            };

            // If high school: only grades, no field
            if (educationLevel === 'High School Student') {
                const academicType = faker.helpers.arrayElement(ACADEMIC_TYPES);
                userData.academicType = academicType;
                userData.grades = generateRandomGrades(academicType);
                userData.universityField = null;
            } else {
                // College, University, Graduate, Other: only field, no grades
                userData.academicType = null;
                userData.grades = null;
                userData.universityField = faker.helpers.arrayElement(UNIVERSITY_FIELDS);
            }

            usersToCreate.push(userData);
        }

        // Create users one by one to ensure password hashing works correctly
        let createdCount = 0;

        for (const userData of usersToCreate) {
            try {
                await AuthUser.create(userData);
                createdCount++;
                if (createdCount % 20 === 0) {
                    console.log(`✅ Created ${createdCount} users...`);
                }
            } catch (err) {
                console.error(`⚠️  Failed to create user ${userData.email}:`, err.message);
            }
        }
        
        console.log(`✅ Created ${createdCount} users total`);

        console.log('\n========================================');
        console.log('✅ Database seeding completed!');
        console.log('========================================');
        console.log(`📧 Admin Email: ${adminEmail}`);
        console.log(`👥 Regular Users Created: ${createdCount}`);
        console.log(`🔐 Default Password: User@123456`);
        console.log(`📚 Education Levels: ${EDUCATION_LEVELS.join(', ')}`);
        console.log(`📖 High School: has grades (science/society), no field`);
        console.log(`🏫 College/University: has field, no grades`);
        console.log('========================================\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
