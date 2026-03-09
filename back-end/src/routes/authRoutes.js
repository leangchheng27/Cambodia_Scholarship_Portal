// src/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');
const { authenticateToken } = require('../middlewares/authToken');
const { sendOTPEmail, sendPasswordResetEmail } = require('../utils/mailer');

const router = express.Router();

// This will be set when initializing routes
let AuthUser;

/**
 * Initialize auth routes with the AuthUser model
 * @param {Object} userModel - Sequelize AuthUser model
 */
const initAuthRoutes = (userModel) => {
    AuthUser = userModel;
    return router;
};

/**
 * POST /auth/register
 * Step 1 - Send OTP to email
 */
router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        const exists = await AuthUser.findOne({ where: { email } });
        if (exists && exists.isVerified) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        if (exists && !exists.isVerified) {
            exists.otp = otp;
            exists.otpExpiresAt = otpExpiresAt;
            await exists.save();
        } else {
            await AuthUser.create({ email, otp, otpExpiresAt, isVerified: false });
        }

        await sendOTPEmail(email, otp);

        res.json({ message: 'OTP sent to your email. Please check your inbox.' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration error', details: err.message });
    }
});

/**
 * POST /auth/verify-otp
 * Step 2 - Verify OTP code
 */
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await AuthUser.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
        if (new Date() > new Date(user.otpExpiresAt)) {
            return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        res.json({ message: 'Email verified successfully. Please set your password.' });
    } catch (err) {
        res.status(500).json({ error: 'Verification error', details: err.message });
    }
});

/**
 * POST /auth/set-password
 * Step 3 - Set password after OTP verification
 */
router.post('/set-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AuthUser.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (!user.isVerified) return res.status(400).json({ error: 'Email not verified yet' });
        if (user.password) return res.status(400).json({ error: 'Password already set. Please login.' });

        user.password = password;
        await user.save();

        res.json({ message: 'Password set successfully! You can now login.' });
    } catch (err) {
        res.status(500).json({ error: 'Error setting password', details: err.message });
    }
});

/**
 * POST /auth/login
 * Login a user
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AuthUser.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (!user.password) {
            return res.status(400).json({ error: 'Please complete registration first' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email before logging in' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRE || '1d' }
        );

        res.json({ 
            token, 
            user: { 
                id: user.id, 
                email: user.email,
                name: user.name,
                picture: user.picture,
            } 
        });
    } catch (err) {
        res.status(500).json({ error: 'Login error', details: err.message });
    }
});

/**
 * GET /auth/me
 * Get current user (protected)
 */
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await AuthUser.findByPk(req.user.id, {
            attributes: ['id', 'email', 'name', 'picture', 'isVerified']
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get user' });
    }
});

/**
 * GET /auth/users
 * Get list of all users (protected)
 */
router.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await AuthUser.findAll({ 
            attributes: ['id', 'email', 'name', 'picture'] 
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

/**
 * GET /auth/google
 * Redirect to Google login
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * GET /auth/google/callback
 * Google OAuth callback
 */
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/auth/login' }),
    (req, res) => {
        // User is authenticated, generate JWT
        const token = jwt.sign(
            { id: req.user.id, email: req.user.email },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRE || '1d' }
        );

        // Redirect to frontend with token
        res.redirect(`${config.FRONTEND_URL || 'http://localhost:5173'}/home?token=${token}`);
    }
);

/**
 * POST /auth/logout
 * Logout (client-side token removal)
 */
router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

/**
 * POST /auth/forgot-password
 * Step 1 - Send password reset OTP to email
 */
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await AuthUser.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'No account found with this email' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        await sendPasswordResetEmail(email, otp);

        res.json({ message: 'Password reset code sent to your email. Please check your inbox.' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Failed to send reset email', details: err.message });
    }
});

/**
 * POST /auth/reset-password
 * Step 2 - Verify OTP and reset password
 */
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await AuthUser.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.otp || user.otp !== otp) {
            return res.status(400).json({ error: 'Invalid reset code' });
        }

        if (new Date() > new Date(user.otpExpiresAt)) {
            return res.status(400).json({ error: 'Reset code has expired. Please request a new one.' });
        }

        user.password = newPassword;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        res.json({ message: 'Password has been reset successfully! You can now login with your new password.' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ error: 'Failed to reset password', details: err.message });
    }
});

module.exports = { router, initAuthRoutes };
