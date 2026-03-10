// Admin routes - only accessible by admin users
import express from 'express';
import { authenticateAdmin } from '../../middlewares/auth/adminMiddleware.js';

const router = express.Router();

// This will be set when initializing routes
let AuthUser;

/**
 * Initialize admin routes with the AuthUser model
 * @param {Object} userModel - Sequelize AuthUser model
 */
const initAdminRoutes = (userModel) => {
    AuthUser = userModel;
    return router;
};

/**
 * GET /admin/dashboard
 * Get dashboard statistics
 */
router.get('/dashboard', authenticateAdmin, async (req, res) => {
    try {
        const totalUsers = await AuthUser.count({ where: { role: 'user' } });
        const totalAdmins = await AuthUser.count({ where: { role: 'admin' } });
        const verifiedUsers = await AuthUser.count({ where: { isVerified: true, role: 'user' } });
        const unverifiedUsers = await AuthUser.count({ where: { isVerified: false, role: 'user' } });

        res.json({
            stats: {
                totalUsers,
                totalAdmins,
                verifiedUsers,
                unverifiedUsers,
                totalAll: totalUsers + totalAdmins,
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats', details: err.message });
    }
});

/**
 * GET /admin/users
 * Get all users (admin only)
 */
router.get('/users', authenticateAdmin, async (req, res) => {
    try {
        const users = await AuthUser.findAll({
            attributes: ['id', 'email', 'name', 'picture', 'role', 'isVerified', 'createdAt'],
            order: [['createdAt', 'DESC']],
        });
        res.json({ users });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
});

/**
 * GET /admin/users/:id
 * Get single user details
 */
router.get('/users/:id', authenticateAdmin, async (req, res) => {
    try {
        const user = await AuthUser.findByPk(req.params.id, {
            attributes: ['id', 'email', 'name', 'picture', 'role', 'isVerified', 'googleId', 'createdAt', 'updatedAt'],
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user', details: err.message });
    }
});

/**
 * PUT /admin/users/:id
 * Update user details
 */
router.put('/users/:id', authenticateAdmin, async (req, res) => {
    try {
        const { name, email, isVerified, role } = req.body;
        const user = await AuthUser.findByPk(req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Prevent modifying own admin role
        if (user.id === req.user.id && role !== 'admin') {
            return res.status(400).json({ error: 'Cannot remove your own admin role' });
        }

        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (isVerified !== undefined) user.isVerified = isVerified;
        if (role !== undefined) user.role = role;

        await user.save();
        
        res.json({ 
            message: 'User updated successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                isVerified: user.isVerified,
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user', details: err.message });
    }
});

/**
 * DELETE /admin/users/:id
 * Delete a user
 */
router.delete('/users/:id', authenticateAdmin, async (req, res) => {
    try {
        const user = await AuthUser.findByPk(req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Prevent deleting own account
        if (user.id === req.user.id) {
            return res.status(400).json({ error: 'Cannot delete your own account' });
        }

        await user.destroy();
        
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
});

/**
 * GET /admin/profile
 * Get admin profile
 */
router.get('/profile', authenticateAdmin, async (req, res) => {
    try {
        const admin = await AuthUser.findByPk(req.user.id, {
            attributes: ['id', 'email', 'name', 'picture', 'role', 'createdAt'],
        });
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        
        res.json({ admin });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch profile', details: err.message });
    }
});

export { router as adminRouter, initAdminRoutes };
