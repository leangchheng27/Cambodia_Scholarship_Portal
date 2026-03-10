// Configuration file for environment variables
 const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'capstone_db',
  DB_PORT: process.env.DB_PORT || 3306,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-this',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',

  // Email (Gmail)
  GMAIL_USER: process.env.GMAIL_USER || '',
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD || '',

  // Frontend URL (for OAuth redirects)
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
 };
 
 export default config;
