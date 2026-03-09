// src/middlewares/authToken.js
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Middleware to authenticate JWT token
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }

    try {
        const user = jwt.verify(token, config.JWT_SECRET);
        req.user = user;
        next();
    } catch {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { authenticateToken };
