import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import config from './src/config/index.js';
import errorHandler from './src/middlewares/errorHandler.js';
import { adminRouter, initAdminRoutes } from './src/routes/adminRoutes.js';
import sequelize from './src/db/database.js';
import AuthUserModel from './src/models/auth/AuthUser.js';
import { initializeModels } from './src/models/index.js';
import { createGoogleStrategy } from './src/strategies/auth/googleStrategy.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const AuthUser = AuthUserModel(sequelize);

const app = express();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSP Admin API',
      version: '1.0.0',
      description: 'Admin API documentation for Cambodia Scholarship Portal',
    },
  },
  apis: ['./src/routes/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lightweight request timing
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

// CORS configuration for admin frontend
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    if (origin === config.ADMIN_FRONTEND_URL) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Session configuration
app.use(
  session({
    secret: config.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Configure Google strategy if credentials provided
if (config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET) {
  passport.use(createGoogleStrategy(AuthUser));
  console.log('✅ Google OAuth enabled');
} else {
  console.log('⚠️ Google OAuth disabled');
}

// Database sync
try {
  await sequelize.sync({ alter: true });
  console.log('✅ Database synced');
} catch (err) {
  console.error('❌ Database sync failed:', err);
}

// Initialize models
const models = initializeModels(sequelize);

// Routes
app.use('/admin', initAdminRoutes(AuthUser));

// Error handling
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Admin backend running on port ' + config.PORT });
});

// Server startup
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`\n🎉 Admin Backend running at http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api-docs\n`);
});
