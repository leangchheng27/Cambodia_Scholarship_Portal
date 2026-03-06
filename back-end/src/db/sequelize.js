// src/db/sequelize.js
const { Sequelize } = require('sequelize');
const config = require('../config');
const AuthUserModel = require('../models/AuthUser');

// Create Sequelize instance
const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: 'mysql',
        logging: config.NODE_ENV === 'development' ? console.log : false,
    }
);

// Initialize models
const AuthUser = AuthUserModel(sequelize);

module.exports = {
    sequelize,
    AuthUser,
};
