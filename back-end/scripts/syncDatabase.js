// Script to sync database schema with models
import 'dotenv/config';
import sequelize from '../src/db/database.js';
import AuthUserModel from '../src/models/auth/AuthUser.js';

const AuthUser = AuthUserModel(sequelize);

const syncDatabase = async () => {
    try {
        console.log('🔄 Syncing database schema...');
        
        // Alter tables to add new columns if they don't exist
        await sequelize.sync({ alter: true });
        
        console.log('✅ Database schema synced successfully');
        console.log('ℹ️  Models updated: AuthUser');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing database:', error);
        process.exit(1);
    }
};

syncDatabase();
