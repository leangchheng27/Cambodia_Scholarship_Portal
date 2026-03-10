// User Repository - handles all database queries for users
import sequelize from '../../db/database.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

class UserRepository {
  // Get all users
  static async findAll() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  // Get user by ID
  static async findById(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  // Get user by email
  static async findByEmail(email) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }

  // Create a new user
  static async create(name, email, password) {
    try {
      const user = await User.create({ name, email, password });
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Update user
  static async update(id, name, email) {
    try {
      const user = await User.findByPk(id);
      if (!user) return false;
      user.name = name;
      user.email = email;
      await user.save();
      return true;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  // Delete user
  static async delete(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) return false;
      await user.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default UserRepository;
