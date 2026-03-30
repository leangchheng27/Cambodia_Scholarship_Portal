// src/models/AuthUser.js
// User model for authentication using Sequelize
import { DataTypes, Op } from 'sequelize';
import bcrypt from 'bcrypt';

const AuthUserModel = (sequelize) => {
    const AuthUser = sequelize.define('AuthUser', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        otpExpiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        studentType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        interests: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        skills: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        grades: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    }, {
        tableName: 'users',
        indexes: [
            { fields: ['email'], unique: true, name: 'idx_users_email' },
            { fields: ['googleId'], unique: true, name: 'idx_users_googleId', where: { googleId: { [Op.not]: null } } },
        ],
    });

    // Hash password before create
    AuthUser.beforeCreate(async (user) => {
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });

    // Hash password before update (only if modified)
    AuthUser.beforeUpdate(async (user) => {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });

    return AuthUser;
};

export default AuthUserModel;
