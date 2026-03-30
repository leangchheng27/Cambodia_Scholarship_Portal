// Script to sync database schema with models
import 'dotenv/config';
import sequelize from '../src/db/database.js';
import { DataTypes } from 'sequelize';
import AuthUserModel from '../src/models/auth/AuthUser.js';
import UserFeedback from '../src/models/feedback/UserFeedback.js';

const AuthUser = AuthUserModel(sequelize);

const ensureColumn = async (queryInterface, tableName, columnName, definition) => {
    const table = await queryInterface.describeTable(tableName);
    if (!table[columnName]) {
        console.log(`Adding ${tableName}.${columnName}`);
        await queryInterface.addColumn(tableName, columnName, definition);
    } else {
        console.log(`${tableName}.${columnName} already exists`);
    }
};

const syncDatabase = async () => {
    try {
        console.log('Syncing database schema...');
        const queryInterface = sequelize.getQueryInterface();
        await AuthUser.sync();
        await UserFeedback.sync({ alter: true });

        // New user profile columns
        await ensureColumn(queryInterface, 'users', 'phone',       { type: DataTypes.STRING, allowNull: true });
        await ensureColumn(queryInterface, 'users', 'nationality',  { type: DataTypes.STRING, allowNull: true });
        await ensureColumn(queryInterface, 'users', 'profileType',  { type: DataTypes.STRING, allowNull: true });
        await ensureColumn(queryInterface, 'users', 'educationLevel', { type: DataTypes.STRING, allowNull: true });
        await ensureColumn(queryInterface, 'users', 'studentType',  { type: DataTypes.STRING, allowNull: true });
        await ensureColumn(queryInterface, 'users', 'academicType', { type: DataTypes.STRING, allowNull: true });
        await ensureColumn(queryInterface, 'users', 'interests', { type: DataTypes.JSON, allowNull: true });
        await ensureColumn(queryInterface, 'users', 'universityField', { type: DataTypes.STRING, allowNull: true });
        await ensureColumn(queryInterface, 'users', 'skills',       { type: DataTypes.JSON,   allowNull: true });
        await ensureColumn(queryInterface, 'users', 'grades',       { type: DataTypes.JSON,   allowNull: true });

        await ensureColumn(queryInterface, 'scholarship', 'type', { type: DataTypes.ENUM('cambodia', 'abroad'), allowNull: false, defaultValue: 'cambodia' });
        await ensureColumn(queryInterface, 'scholarship', 'original_link', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'scholarship', 'poster_image_url', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'scholarship', 'slider_image_url', { type: DataTypes.STRING(512), allowNull: true });

        await ensureColumn(queryInterface, 'internship', 'original_link', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'internship', 'poster_image_url', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'internship', 'slider_image_url', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'internship', 'ai_metadata', { type: DataTypes.JSON, allowNull: true });

        await ensureColumn(queryInterface, 'university', 'original_link', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'university', 'poster_image_url', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'university', 'slider_image_url', { type: DataTypes.STRING(512), allowNull: true });
        
        console.log('Database schema synced successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1);
    }
};

syncDatabase();
