// User Repository - handles all database queries for users
const pool = require('../db/database');
const User = require('../models/User');

class UserRepository {
  // Get all users
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows.map(row => User.fromDatabase(row));
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  // Get user by ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows.length > 0 ? User.fromDatabase(rows[0]) : null;
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  // Get user by email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows.length > 0 ? User.fromDatabase(rows[0]) : null;
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }

  // Create a new user
  static async create(name, email, password) {
    try {
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
      );
      return { id: result.insertId, name, email };
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Update user
  static async update(id, name, email) {
    try {
      const [result] = await pool.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  // Delete user
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = UserRepository;
