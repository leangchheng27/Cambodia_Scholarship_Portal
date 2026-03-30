// Script to reset all user passwords to a known working password
import 'dotenv/config';
import sequelize from '../src/db/database.js';
import AuthUserModel from '../src/models/auth/AuthUser.js';
import bcrypt from 'bcrypt';

const AuthUser = AuthUserModel(sequelize);

const resetPasswords = async () => {
    try {
        await sequelize.sync();

        const newPassword = 'User@123456';
        
        // Hash the password manually
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update all regular users
        const result = await AuthUser.update(
            { password: hashedPassword },
            { where: { role: 'user' } }
        );

        console.log(`✅ Updated ${result[0]} regular user passwords`);

        // Also update admin password from .env
        const adminNewPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
        const adminSalt = await bcrypt.genSalt(10);
        const adminHashedPassword = await bcrypt.hash(adminNewPassword, adminSalt);

        const adminResult = await AuthUser.update(
            { password: adminHashedPassword },
            { where: { email: process.env.ADMIN_EMAIL } }
        );

        console.log(`✅ Updated ${adminResult[0]} admin password`);

        // Test the login now
        console.log('\n🔐 Testing passwords after reset...');
        const testUser = await AuthUser.findOne({ where: { role: 'user' }, raw: true });
        
        if (testUser) {
            const match = await bcrypt.compare('User@123456', testUser.password);
            console.log(`✅ Regular user password test: ${match ? 'PASS ✓' : 'FAIL ✗'}`);
        }

        const admin = await AuthUser.findOne({ where: { role: 'admin' }, raw: true });
        if (admin) {
            const match = await bcrypt.compare(adminNewPassword, admin.password);
            console.log(`✅ Admin password test: ${match ? 'PASS ✓' : 'FAIL ✗'}`);
        }

        console.log('\n========================================');
        console.log('✅ All passwords have been reset!');
        console.log('========================================');
        console.log(`👤 Regular User Password: User@123456`);
        console.log(`👨‍💼 Admin Password: ${adminNewPassword}`);
        console.log('========================================\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error resetting passwords:', error.message);
        process.exit(1);
    }
};

resetPasswords();
