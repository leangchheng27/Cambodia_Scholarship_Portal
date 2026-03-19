# Cambodia Scholarship Portal - Final Project Structure

## ✅ Setup Complete

The admin system has been successfully separated from the main user website. Here's the current state:

## 📁 Project Structure (Option B - Complete Separation)

```
Cambodia_Scholarship_Portal/
│
├── admin/                           [ISOLATED ADMIN SYSTEM]
│   ├── src/                         [Admin Frontend - React]
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx   [Main admin interface with CRUD]
│   │   │   ├── AIAnalytics.jsx      [Analytics dashboard]
│   │   │   ├── LoadingText.jsx
│   │   │   ├── adminApi.js          [API service layer]
│   │   │   └── *.css                [Styling]
│   │   ├── pages/
│   │   │   └── LoginPage.jsx        [Admin-only login]
│   │   ├── context/
│   │   │   └── AuthContext.jsx      [JWT auth state]
│   │   ├── services/
│   │   │   └── api.js               [Axios @ localhost:3001]
│   │   ├── main.jsx
│   │   └── App.jsx
│   │
│   ├── back-end/                    [Admin Backend - Node.js/Express]
│   │   ├── src/
│   │   │   ├── routes/admin/
│   │   │   │   └── adminRoutes.js   [CRUD endpoints]
│   │   │   ├── models/              [Sequelize models]
│   │   │   ├── db/                  [Database config]
│   │   │   ├── middlewares/         [Auth, error handling]
│   │   │   ├── strategies/          [Google OAuth]
│   │   │   ├── controllers/         [Business logic]
│   │   │   └── utils/               [Helpers]
│   │   ├── index.js                 [Express server @ port 3001]
│   │   ├── package.json             [Admin backend deps]
│   │   ├── .env                     [Config - DB, JWT, ports]
│   │   └── scripts/
│   │
│   ├── package.json                 [Admin frontend deps]
│   ├── vite.config.js               [Frontend build config]
│   ├── index.html
│   ├── eslint.config.js
│   ├── ADMIN_SETUP.md               [Setup & run instructions]
│   └── README.md
│
├── front-end/                       [USER-ONLY WEBSITE]
│   ├── src/
│   │   ├── components/              [User components]
│   │   ├── pages/
│   │   ├── services/
│   │   └── ... (admin files removed ✓)
│   ├── package.json                 [React, Vite, etc.]
│   └── vite.config.js               [Port 5173]
│
├── back-end/                        [ORIGINAL SHARED BACKEND]
│   ├── src/
│   │   ├── routes/                  [All endpoints]
│   │   ├── models/
│   │   ├── db/                      [MySQL connection]
│   │   └── ...
│   ├── package.json
│   └── index.js                     [Port 3000]
│
└── [Other files: docs, scripts, schema, etc.]
```

## 🚀 Running The System

### Quick Start (3 Terminals)

**Terminal 1 - Admin Backend:**
```bash
cd Cambodia_Scholarship_Portal/admin/back-end
npm install  # If not done
npm run dev
# Running on http://localhost:3001
```

**Terminal 2 - Admin Frontend:**
```bash
cd Cambodia_Scholarship_Portal/admin
npm install  # If not done
npm run dev
# Running on http://localhost:5174
```

**Terminal 3 - User Website (Optional):**
```bash
cd Cambodia_Scholarship_Portal/front-end
npm install  # If not done
npm run dev
# Running on http://localhost:5173
```

## 🔧 Configuration Status

### Admin Backend (.env)
```env
ADMIN_PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=             # Update with your credentials
DB_NAME=capstone_db
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_FRONTEND_URL=http://localhost:5174
```

### Admin Frontend (api.js)
✅ **Updated to use:** `http://localhost:3001`

### Main Frontend
✅ **Admin files removed:**
- ❌ admin.html
- ❌ src/adminMain.jsx
- ❌ src/admin/ directory

## 📊 Database Setup

Both admin and user backends use the **same database** (`capstone_db`):
- Shared tables: `auth_users`, `universities`, `scholarships`, `internships`
- Admin manages content, users manage applications
- Zero data conflicts (different use cases)

## ✨ Key Features

### Admin System Features
- **Dashboard**: Statistics, analytics, AI insights
- **User Management**: CRUD operations with role-based access
- **Content Management**: Universities, scholarships, internships
- **AI Analytics**: Engagement metrics, recommendations tracking
- **Authentication**: JWT + optional Google OAuth

### User Website Features
- Browse scholarships/internships
- Apply for opportunities
- AI-powered recommendations
- Profile management
- Responsive design

## 🔐 Authentication

- Admin: JWT-based with admin middleware checks
- Users: JWT-based with user role verification
- Both systems have separate login pages
- Admin can only login with admin role
- Users cannot access admin endpoints

## 📝 Files Changed/Created

### ✅ Created
- `admin/back-end/.env` - Environment configuration
- `admin/ADMIN_SETUP.md` - Setup instructions

### ✅ Updated
- `admin/src/services/api.js` - Changed baseURL to localhost:3001

### ✅ Removed from front-end
- `front-end/admin.html`
- `front-end/src/adminMain.jsx`
- `front-end/src/admin/` directory (entire folder)

### ℹ️ Unchanged  
- `back-end/` - Kept for reference/can be decommissioned
- `csp/` and backup folders - Unchanged

## 🎯 Port Configuration (Summary)

| App | Frontend | Backend | Purpose |
|-----|----------|---------|---------|
| Admin | 5174 | 3001 | Admin management system |
| User | 5173 | 3000 | User-facing website |

## 📚 Documentation

- `admin/ADMIN_SETUP.md` - Comprehensive setup and troubleshooting guide
- `admin/README.md` - Admin app README
- Main project docs - Available in root directory

## ✅ Verification Checklist

- [x] Admin frontend created with all components
- [x] Admin backend created with all routes/models
- [x] .env file configured for admin backend
- [x] API URL updated to localhost:3001
- [x] Admin files removed from user website
- [x] Database connection configured
- [x] Authentication middleware in place
- [x] Routes mounted and ready
- [x] Setup documentation created

## 🧪 Next Steps

1. **Install Dependencies**:
   ```bash
   cd admin/back-end && npm install
   cd ../.. && cd admin && npm install
   ```

2. **Update .env File** (if needed):
   ```
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_secure_secret_key
   ```

3. **Test Admin System**:
   - Start backend: `npm run dev` in `admin/back-end/`
   - Start frontend: `npm run dev` in `admin/`
   - Login at http://localhost:5174
   - Test CRUD operations

4. **Test User System** (Optional):
   - Start frontend: `npm run dev` in `front-end/`
   - Verify no admin-related code remains
   - Test user registration and scholarship browsing

## 🐛 Troubleshooting

If you encounter issues:
- Check `admin/ADMIN_SETUP.md` for detailed troubleshooting
- Ensure MySQL is running and database exists
- Verify port 3001 and 5174 are not in use
- Check .env file has valid database credentials
- Run `npm install` if modules are missing

## 📞 System Overview

This architecture provides:
- **Clean Separation**: Admin system completely isolated
- **Shared Database**: Both systems use same DB (no duplication)
- **Independent Scaling**: Admin and user systems can scale independently
- **Easy Reporting**: Folder structure matches documentation needs
- **Maintainability**: Clear responsibility boundaries

---

**Project Status**: ✅ READY FOR TESTING & DEPLOYMENT
