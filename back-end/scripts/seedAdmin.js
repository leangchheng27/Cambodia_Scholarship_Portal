// Script to create admin user from .env credentials
import 'dotenv/config';
import sequelize from '../src/db/database.js';
import AuthUserModel from '../src/models/auth/AuthUser.js';
import config from '../src/config/index.js';

const AuthUser = AuthUserModel(sequelize);

const seedAdmin = async () => {
    try {
        await sequelize.sync();

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.error('❌ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env file');
            process.exit(1);
        }

        // Check if admin already exists
        const existingAdmin = await AuthUser.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            // Update existing user to admin if not already
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin';
                existingAdmin.isVerified = true;
                // Add profile data if missing
                if (!existingAdmin.profileType) {
                    existingAdmin.profileType = 'admin';
                    existingAdmin.studentType = 'student';
                    existingAdmin.academicType = 'science';
                    existingAdmin.educationLevel = 'College/University Student';
                    existingAdmin.universityField = 'Administration';
                    existingAdmin.grades = {
                        'Math': 'A',
                        'Biology': 'A',
                        'Khmer Literature': 'A',
                        'Physics': 'A',
                        'Chemistry': 'A',
                        'History': 'A',
                        'English': 'A'
                    };
                }
                await existingAdmin.save();
                console.log('✅ Updated existing user to admin role');
            } else {
                console.log('ℹ️  Admin user already exists');
            }
        } else {
            // Create new admin user with complete profile data
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
                educationLevel: 'College/University Student',
                universityField: 'Administration',
                grades: {
                    'Math': 'A',
                    'Biology': 'A',
                    'Khmer Literature': 'A',
                    'Physics': 'A',
                    'Chemistry': 'A',
                    'History': 'A',
                    'English': 'A'
                },
                interests: null,
            });
            console.log('✅ Admin user created successfully');
        }

        console.log(`📧 Admin Email: ${adminEmail}`);
        console.log('🔐 Use the password from .env to login');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
