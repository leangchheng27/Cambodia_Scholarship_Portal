// Script to sync database schema with models
import 'dotenv/config';
import sequelize from '../src/db/database.js';
import { DataTypes } from 'sequelize';
import AuthUserModel from '../src/models/auth/AuthUser.js';
import '../src/models/feedback/UserFeedback.js';

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

        await ensureColumn(queryInterface, 'scholarship', 'type', { type: DataTypes.ENUM('cambodia', 'abroad'), allowNull: false, defaultValue: 'cambodia' });
        await ensureColumn(queryInterface, 'scholarship', 'original_link', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'scholarship', 'poster_image_url', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'scholarship', 'slider_image_url', { type: DataTypes.STRING(512), allowNull: true });

        await ensureColumn(queryInterface, 'internship', 'original_link', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'internship', 'poster_image_url', { type: DataTypes.STRING(512), allowNull: true });
        await ensureColumn(queryInterface, 'internship', 'slider_image_url', { type: DataTypes.STRING(512), allowNull: true });

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
