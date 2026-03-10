require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const config = require('./src/config');
const errorHandler = require('./src/middlewares/errorHandler');
const userRoutes = require('./src/routes/userRoutes');
const { router: authRoutes, initAuthRoutes } = require('./src/routes/authRoutes');
const { sequelize, AuthUser } = require('./src/db/sequelize');
const { createGoogleStrategy } = require('./src/strategies/googleStrategy');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: config.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Session configuration (required for Passport)
app.use(
  session({
    secret: config.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Configure Google strategy
passport.use(createGoogleStrategy(AuthUser));

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await AuthUser.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Initialize auth routes with AuthUser model
initAuthRoutes(AuthUser);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recommendations', require('./src/routes/recommendationRoutes'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running', status: 'success' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server with database sync
sequelize.sync().then(() => {
  app.listen(config.PORT, () => {
    console.log(`
🚀 Server running on http://localhost:${config.PORT}
📝 Environment: ${config.NODE_ENV}
🔐 Auth routes available at /api/auth
    `);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
  // Fall back to starting without database sync
  app.listen(config.PORT, () => {
    console.log(`
🚀 Server running on http://localhost:${config.PORT} (DB sync failed)
📝 Environment: ${config.NODE_ENV}
    `);
  });
});