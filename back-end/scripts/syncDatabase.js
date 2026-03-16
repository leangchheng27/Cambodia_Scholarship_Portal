// Script to sync database schema with models
import 'dotenv/config';
import sequelize from '../src/db/database.js';
import { DataTypes } from 'sequelize';
import AuthUserModel from '../src/models/auth/AuthUser.js';
import '../src/models/feedback/UserFeedback.js';  // registers UserFeedback model

const AuthUser = AuthUserModel(sequelize);

const ensureColumn = async (queryInterface, tableName, columnName, definition) => {
    const table = await queryInterface.describeTable(tableName);
    if (!table[columnName]) {
        console.log(`➕ Adding ${tableName}.${columnName}`);
        await queryInterface.addColumn(tableName, columnName, definition);
    } else {
        console.log(`✓ ${tableName}.${columnName} already exists`);
    }
};

const syncDatabase = async () => {
    try {
        console.log('🔄 Syncing database schema...');

        const queryInterface = sequelize.getQueryInterface();

        // Keep auth tables in sync (safe for these models).
        await AuthUser.sync();

        // Add missing content columns introduced in latest schema.
        await ensureColumn(queryInterface, 'scholarship', 'original_link', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'scholarship', 'poster_image_url', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'scholarship', 'slider_image_url', { type: DataTypes.STRING(512), allowNull: true });

        await ensureColumn(queryInterface, 'internship', 'original_link', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'internship', 'poster_image_url', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'internship', 'slider_image_url', { type: DataTypes.STRING(512), allowNull: true });

        await ensureColumn(queryInterface, 'university', 'original_link', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'university', 'poster_image_url', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'university', 'slider_image_url', { type: DataTypes.STRING(512), allowNull: true });
        
        console.log('✅ Database schema synced successfully');
        console.log('ℹ️  Models updated: AuthUser + required content columns');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing database:', error);
        process.exit(1);
    }
};

syncDatabase();
