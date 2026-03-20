import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import config from './src/config/index.js';
import errorHandler from './src/middlewares/errorHandler.js';
import userRoutes from './src/routes/user/userRoutes.js';
import internshipRoutes from './src/routes/internship/internshipRoutes.js';
import scholarshipRoutes from './src/routes/scholarship/scholarshipRoutes.js';
import universityRoutes from './src/routes/university/universityRoutes.js';
import { router as authRoutes, initAuthRoutes } from './src/routes/auth/authRoutes.js';
import { adminRouter as adminRoutes, initAdminRoutes } from './src/routes/admin/adminRoutes.js';
import { feedbackRouter as feedbackRoutes } from './src/routes/feedback/feedbackRoutes.js';
import recommendationRoutes from './src/ai/recommendationRoutes.js';
import sequelize from './src/db/database.js';
import AuthUserModel from './src/models/auth/AuthUser.js';
import { initializeModels } from './src/models/index.js';

const AuthUser = AuthUserModel(sequelize);
import { createGoogleStrategy } from './src/strategies/auth/googleStrategy.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSP API',
      version: '1.0.0',
      description: 'API documentation for Cambodia Scholarship Portal',
    },
  },
  apis: ['./routes/*.js'], // Path to your route files for Swagger comments
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Lightweight request timing to identify slow endpoints quickly
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (duration >= 300) {
      console.log(`[SLOW] ${req.method} ${req.originalUrl} - ${duration}ms`);
    }
  });
  next();
});

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Allow localhost on any port during development
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
    // Allow the configured frontend URL
    if (origin === config.FRONTEND_URL) {
      return callback(null, true);
    }
    
    // Block other origins
    callback(new Error('Not allowed by CORS'));
  },
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

// Configure Google strategy only if credentials are provided
if (config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET) {
  passport.use(createGoogleStrategy(AuthUser));
  console.log('✅ Google OAuth enabled');
} else {
  console.log('⚠️  Google OAuth disabled (credentials not configured)');
}

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
initAdminRoutes(AuthUser);

// Initialize all model associations
initializeModels();

// Routes
app.use('/users', userRoutes);
app.use('/internships', internshipRoutes);
app.use('/scholarships', scholarshipRoutes);
app.use('/universities', universityRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/feedback', feedbackRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'App is running', status: 'success' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server without database sync
app.listen(config.PORT, () => {
  console.log(`
🚀 Server running on http://localhost:${config.PORT}
📝 Environment: ${config.NODE_ENV}
🔐 Auth routes available at /auth
  `);
});