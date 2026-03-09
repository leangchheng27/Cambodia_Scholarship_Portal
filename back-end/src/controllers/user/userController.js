// User Controller - business logic for users
// Controllers should NOT contain database queries - use repositories for that
const UserRepository = require('../../repositories/userRepository');
const { validateUserCreation } = require('../../validators/userValidator');

class UserController {
  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await UserRepository.findAll();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserRepository.findById(id);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Create new user
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validate input
      const validation = validateUserCreation(name, email, password);
      if (!validation.isValid) {
        return res.status(400).json({ success: false, errors: validation.errors });
      }

      // Check if user already exists
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'User already exists' });
      }

      // Create user
      const newUser = await UserRepository.create(name, email, password);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await UserRepository.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const updated = await UserRepository.update(id, name, email);
      if (!updated) {
        return res.status(400).json({ success: false, message: 'Failed to update user' });
      }

      res.status(200).json({ success: true, message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete user
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await UserRepository.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const deleted = await UserRepository.delete(id);
      if (!deleted) {
        return res.status(400).json({ success: false, message: 'Failed to delete user' });
      }

      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = UserController;
