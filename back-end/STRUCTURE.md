# Backend Folder Structure Guide

## Overview
This backend follows the **Repository Pattern** architecture for clean separation of concerns and maintainability.

## Folder Structure

```
back-end/
├── src/
│   ├── config/              # Configuration & environment variables
│   │   └── index.js         # Central config file
│   ├── db/                  # Database connection & pool
│   │   └── database.js      # MySQL connection pool
│   ├── models/              # Data models/schemas
│   │   └── User.js          # Example: User model
│   ├── repositories/        # Database queries (Data Access Layer) ⭐
│   │   └── userRepository.js
│   ├── controllers/         # Business logic (no DB calls here!)
│   │   └── userController.js
│   ├── routes/              # API endpoints
│   │   └── userRoutes.js
│   ├── middlewares/         # Custom middlewares
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── validators/          # Input validation
│   │   └── userValidator.js
│   └── utils/               # Helper functions
│       └── helpers.js
├── .env.example             # Environment template
├── .env                     # Local environment (DON'T COMMIT!)
├── index.js                 # Entry point
└── package.json
```

## Flow Diagram

```
Request
  ↓
Routes (userRoutes.js) ─ defines endpoints
  ↓
Controllers (userController.js) ─ handles business logic
  ↓
Repositories (userRepository.js) ─ queries database
  ↓
Database (database.js) ─ executes SQL
```

## Key Files Explained

### 1. **config/index.js**
- Centralized configuration management
- Reads from `.env` file
- Used throughout the app

### 2. **db/database.js** ⭐
- Creates MySQL connection pool (reuses connections for efficiency)
- Tests database connection on startup
- Exported to repositories

### 3. **models/User.js**
- Defines User schema structure
- Methods to convert database rows to objects
- No database queries here

### 4. **repositories/userRepository.js** ⭐ IMPORTANT
- **ALL database queries go here**
- Static methods for each DB operation
- Repositories are called by controllers
- Easy to test and mock

### 5. **controllers/userController.js** ⭐ IMPORTANT
- **Contains business logic only**
- NO database queries here - use repositories!
- Validates input before using
- Handles errors and sends responses

### 6. **routes/userRoutes.js**
- Maps HTTP methods to controller methods
- GET, POST, PUT, DELETE operations
- Mounted on `/api/users`

### 7. **validators/userValidator.js**
- Input validation functions
- Error messages
- Used by controllers

### 8. **middlewares/**
- `authMiddleware.js` - JWT verification (TODO)
- `errorHandler.js` - Global error handling

## How to Add a New Resource (e.g., Scholarship)

1. **Create model**: `src/models/Scholarship.js`
2. **Create repository**: `src/repositories/scholarshipRepository.js`
   ```javascript
   class ScholarshipRepository {
     static async findAll() { /* query */ }
     static async findById(id) { /* query */ }
     // ... other methods
   }
   ```
3. **Create controller**: `src/controllers/scholarshipController.js`
   ```javascript
   class ScholarshipController {
     static async getAllScholarships(req, res) {
       const scholarships = await ScholarshipRepository.findAll();
       res.json({ success: true, data: scholarships });
     }
   }
   ```
4. **Create routes**: `src/routes/scholarshipRoutes.js`
5. **Mount in index.js**:
   ```javascript
   const scholarshipRoutes = require('./src/routes/scholarshipRoutes');
   app.use('/api/scholarships', scholarshipRoutes);
   ```

## Best Practices

✅ **DO:**
- Put ALL database queries in repositories
- Keep controllers thin (business logic only)
- Validate input in validators
- Use the connection pool from database.js
- Handle errors gracefully

❌ **DON'T:**
- Make database queries in controllers
- Mix business logic and DB queries
- Create new database connections
- Hardcode configuration values

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Then update with your actual database credentials.

## Next Steps

1. Install `dotenv` and `mysql2/promise` (if not already done)
2. Set up MySQL database & verify connection
3. Create `.env` file with your credentials
4. Test the User API endpoints
5. Follow the pattern to create other resource repositories/controllers
