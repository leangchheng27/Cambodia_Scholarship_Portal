# Cambodia Scholarship Portal (CSP)

A comprehensive AI-powered educational guidance platform designed to help Cambodian students discover and apply for scholarships, internships, and university opportunities. The platform leverages machine learning to provide personalized recommendations based on student academic profiles.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation & Setup](#installation--setup)
7. [Configuration](#configuration)
8. [Running the Application](#running-the-application)
9. [API Documentation](#api-documentation)
10. [Database Schema](#database-schema)
11. [AI Recommendation System](#ai-recommendation-system)
12. [Admin Features](#admin-features)
13. [Deployment](#deployment)
14. [Contributing](#contributing)
15. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

The **Cambodia Scholarship Portal** is a full-stack web application that serves as a centralized hub for educational opportunities in Cambodia. Students can:

- **Discover Opportunities**: Browse scholarships (domestic and international), internships, and universities
- **Get Recommendations**: Receive AI-powered personalized suggestions based on academic performance
- **Manage Applications**: Save and track opportunities they're interested in
- **Complete Profiles**: Build a student profile with grades to unlock AI recommendations
- **Social Authentication**: Login via email/password or Google OAuth 2.0

Administrators can:

- **Manage Content**: Add, edit, and delete universities, scholarships, and internships
- **Track Analytics**: View platform usage statistics and student engagement
- **Train Models**: Use user feedback data to continuously improve AI recommendations

---

## ✨ Key Features

### **For Students**

| Feature | Description |
|---------|-------------|
| **User Authentication** | Email/password signup with OTP verification and Google OAuth 2.0 support |
| **Profile Setup** | Students select academic stream (Science/Social) and input their grades |
| **AI Recommendations** | Get personalized scholarship and major recommendations based on academic profile |
| **Opportunity Discovery** | Browse 3 categories: Scholarships (Cambodia & Abroad), Internships, Universities |
| **Search & Filter** | Advanced search and filtering by field, type, deadline, and location |
| **Save Functionality** | Bookmark scholarships, internships, and universities for later viewing |
| **Detailed Opportunity Views** | Access comprehensive information including deadlines, eligibility, benefits |
| **Responsive Design** | Works seamlessly on desktop, tablet, and mobile devices |

### **For Administrators**

| Feature | Description |
|---------|-------------|
| **Content Management** | CRUD operations for universities, scholarships, and internships |
| **Detailed Resource Fields** | Manage eligibility criteria, benefits, deadlines, tuition fees, application steps |
| **Analytics Dashboard** | View user engagement, popular opportunities, recommendation performance |
| **User Management** | View all registered users and their profiles |
| **Data Export** | Export training data for model improvement |

### **AI System Features**

| Feature | Description |
|---------|-------------|
| **Smart Matching** | ML model trained to match students with suitable majors and scholarships |
| **Academic-Based Scoring** | Analyzes 10 subject grades and academic stream |
| **Major Rankings** | Scores 12 major fields (IT, Engineering, Health, Agriculture, Architecture, Business, Education, Arts, Law, Social Sciences, Tourism, Languages) |
| **Continuous Learning** | Model improves based on real user interactions (views, saves, applications) |
| **API Integration** | Utilizes Hugging Face Inference API for scalable predictions |

---

## 🛠 Technology Stack

### **Backend**

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | v18+ | JavaScript runtime environment |
| **Express.js** | 4.x | REST API framework |
| **Sequelize** | 6.x | ORM for MySQL database |
| **MySQL2** | 2.x | Database driver |
| **Passport.js** | 0.7.x | Authentication middleware |
| **JWT (jsonwebtoken)** | 9.x | Token-based authentication |
| **bcryptjs** | 2.x | Password hashing |
| **Nodemailer** | 6.x | Email sending service |
| **Axios** | 1.x | HTTP client |
| **Hugging Face Inference** | Latest | ML model hosting and inference |
| **Swagger UI** | Latest | API documentation |

### **Frontend**

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.x | UI library |
| **React Router** | 7.x | Client-side routing |
| **Vite** | 5.x | Build tool and dev server |
| **Axios** | 1.x | HTTP client for API calls |
| **Hugging Face Inference** | Latest | Client-side ML integration |
| **Recharts** | Latest | Data visualization |
| **CSS3** | Latest | Styling and responsive design |

### **Database**

- **MySQL** 8.0+ with Sequelize ORM
- **Database Name**: `capstone_db` (default, configurable)

### **External Services**

| Service | Purpose |
|---------|---------|
| **Hugging Face Spaces** | Host custom ML recommendation model |
| **Gmail/SMTP** | Email notifications (OTP, password resets) |
| **Google Cloud Console** | OAuth 2.0 credentials |

---

## 📁 Project Structure

```
csp/
├── back-end/                           # Backend application
│   ├── index.js                        # Entry point
│   ├── package.json                    # Dependencies
│   ├── src/
│   │   ├── config/                     # Configuration files
│   │   ├── db/                         # Database connection
│   │   ├── models/                     # Sequelize models
│   │   │   ├── auth/                   # Authentication models
│   │   │   ├── scholarship/            # Scholarship models
│   │   │   ├── internship/             # Internship models
│   │   │   ├── university/             # University models
│   │   │   └── ...
│   │   ├── routes/                     # API route handlers
│   │   │   ├── auth/                   # Auth endpoints
│   │   │   ├── scholarships/           # Scholarship endpoints
│   │   │   ├── internships/            # Internship endpoints
│   │   │   ├── universities/           # University endpoints
│   │   │   └── ...
│   │   ├── controllers/                # Business logic
│   │   ├── middlewares/                # Custom middleware (auth, error handling)
│   │   ├── strategies/                 # Passport authentication strategies
│   │   ├── validators/                 # Input validation
│   │   ├── ai/                         # AI recommendation system
│   │   │   ├── recommendationController.js
│   │   │   ├── recommendationRoutes.js
│   │   │   ├── services/               # ML inference services
│   │   │   ├── utils/                  # Utility functions
│   │   │   └── training/               # Data preparation for model training
│   │   └── utils/
│   └── scripts/                        # Database seeding and sync scripts
│
├── front-end/                          # Frontend application
│   ├── package.json
│   ├── vite.config.js                  # Vite configuration
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx                    # React entry point
│   │   ├── App.jsx                     # Main App component
│   │   ├── api/                        # API client services
│   │   │   ├── authApi.js
│   │   │   ├── scholarshipApi.js
│   │   │   ├── internshipApi.js
│   │   │   ├── universityApi.js
│   │   │   ├── recommendationApi.js
│   │   │   └── ...
│   │   ├── context/                    # React context (AuthContext)
│   │   ├── features/                   # Feature modules (page-specific logic)
│   │   │   ├── home/
│   │   │   ├── auth/
│   │   │   ├── scholarship/
│   │   │   ├── internship/
│   │   │   ├── university/
│   │   │   ├── profile/
│   │   │   └── ...
│   │   ├── pages/                      # Page components
│   │   │   ├── home/
│   │   │   ├── auth/
│   │   │   ├── scholarship/
│   │   │   └── ...
│   │   ├── layouts/                    # Layout components
│   │   │   ├── Header/
│   │   │   └── Footer/
│   │   ├── components/                 # Reusable UI components
│   │   │   ├── PosterCard/
│   │   │   ├── SaveToggleButton/
│   │   │   ├── SearchInput/
│   │   │   └── ...
│   │   ├── ai/                         # AI components and services
│   │   │   ├── AIAnalytics.jsx
│   │   │   └── recommendationApi.js
│   │   ├── assets/                     # Images, icons, fonts
│   │   ├── styles/                     # Global styles
│   │   └── utils/                      # Utility functions
│   └── public/                         # Static files
│
└── admin/                              # Admin dashboard (separate app)
    ├── backend/                        # Admin-specific backend logic
    └── frontend/                       # Admin panel UI
```

---

## 📋 Prerequisites

Before installing, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **MySQL Server** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - Recommended: VS Code

### Verify Installation

```bash
node --version    # Should be v18+
npm --version     # Should be v9+
mysql --version   # Should be v8+
```

---

## 🚀 Installation & Setup

### **1. Clone Repository**

```bash
git clone <repository-url>
cd csp
```

### **2. Setup Backend**

```bash
cd back-end

# Install dependencies
npm install

# Create .env file (see Configuration section)
cp .env.example .env

# Setup database
npm run sync-db    # Syncs Sequelize models with MySQL
npm run seed       # Seeds initial data (optional)
```

### **3. Setup Frontend**

```bash
cd ../front-end

# Install dependencies
npm install

# Create .env file (see Configuration section)
cp .env.example .env
```

### **4. Setup Admin Panel (Optional)**

```bash
cd ../admin/frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

---

## ⚙️ Configuration

### **Backend Configuration** (`back-end/.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=capstone_db
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password    # Use Gmail App Password, not regular password
EMAIL_FROM=noreply@cambodiascholarshipportal.com

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Hugging Face API (for AI Recommendations)
HUGGING_FACE_API_KEY=your_hugging_face_api_key
HF_MODEL_ID=leangchheng27/Cambodia-Scholarship-Portal

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### **Frontend Configuration** (`front-end/.env`)

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Cambodia Scholarship Portal
VITE_APP_LOGO=/path/to/logo.png

# Hugging Face API (for client-side inference)
VITE_HUGGING_FACE_API_KEY=your_hugging_face_api_key
```

### **Database Setup**

1. **Create MySQL Database:**
   ```bash
   mysql -u root -p
   ```
   
   ```sql
   CREATE DATABASE capstone_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **Sync Models to Database:**
   ```bash
   cd back-end
   npm run sync-db
   ```

3. **Seed Initial Data (Optional):**
   ```bash
   npm run seed:majors      # Add academic majors
   npm run seed:admin       # Add admin user
   ```

### **Google OAuth Setup**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback`
   - Your production domain

### **Email Configuration**

For Gmail:
1. Enable 2-Factor Authentication
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the App Password in `.env`

For other email providers, update `src/utils/mailer.js`

### **Hugging Face API Setup**

1. Create account at [Hugging Face](https://huggingface.co/)
2. Generate an API token from [Settings → Access Tokens](https://huggingface.co/settings/tokens)
3. Add to `.env` files (both backend and frontend)

---

## ▶️ Running the Application

### **Development Mode**

**Terminal 1 - Start Backend:**
```bash
cd back-end
npm run dev      # Uses nodemon for auto-reload
```
Backend runs at: `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd front-end
npm run dev      # Uses Vite dev server
```
Frontend runs at: `http://localhost:5173`

**Terminal 3 - Start Admin Panel (Optional):**
```bash
cd admin/frontend
npm run dev
```
Admin panel runs at: `http://localhost:5174` (or configured port)

### **Production Mode**

**Build Frontend:**
```bash
cd front-end
npm run build
```

**Start Backend with Production Build:**
```bash
cd back-end
NODE_ENV=production npm start
```

### **Database Operations**

```bash
cd back-end

# Sync database models
npm run sync-db

# Seed majors
npm run seed:majors

# Seed admin user
npm run seed:admin

# Check test scholarships
npm run test-scholarships
```

---

## 📚 API Documentation

### **Base URL**
```
http://localhost:5000/api
```

### **Authentication Endpoints** (`/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | User registration with email |
| POST | `/auth/verify-otp` | Verify OTP from email |
| POST | `/auth/login` | Login with email and password |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password with token |
| GET | `/auth/google` | Initiate Google OAuth |
| GET | `/auth/google/callback` | Google OAuth callback |
| GET | `/auth/logout` | Logout user |
| GET | `/auth/me` | Get current user info (requires auth) |

### **User Endpoints** (`/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/:id` | Get user profile |
| PUT | `/users/:id` | Update user profile |
| POST | `/users/:id/grades` | Submit student grades |
| GET | `/users/:id/grades` | Get user grades |

### **Scholarship Endpoints** (`/scholarships`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/scholarships` | List all scholarships (with filters) |
| GET | `/scholarships/:id` | Get scholarship details |
| POST | `/scholarships` | Create scholarship (admin) |
| PUT | `/scholarships/:id` | Update scholarship (admin) |
| DELETE | `/scholarships/:id` | Delete scholarship (admin) |
| POST | `/scholarships/:id/apply` | Apply for scholarship |

### **Internship Endpoints** (`/internships`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/internships` | List all internships (with filters) |
| GET | `/internships/:id` | Get internship details |
| POST | `/internships` | Create internship (admin) |
| PUT | `/internships/:id` | Update internship (admin) |
| DELETE | `/internships/:id` | Delete internship (admin) |
| POST | `/internships/:id/apply` | Apply for internship |

### **University Endpoints** (`/universities`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/universities` | List all universities |
| GET | `/universities/:id` | Get university details |
| POST | `/universities` | Create university (admin) |
| PUT | `/universities/:id` | Update university (admin) |
| DELETE | `/universities/:id` | Delete university (admin) |

### **Recommendation Endpoints** (`/recommendations`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/recommendations/predict-major` | Get major recommendations for student |
| GET | `/recommendations/scholarships/:userId` | Get recommended scholarships |
| GET | `/recommendations/internships/:userId` | Get recommended internships |

### **Saved Endpoints** (`/saved`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/saved/scholarship/:id` | Save scholarship |
| POST | `/saved/internship/:id` | Save internship |
| POST | `/saved/university/:id` | Save university |
| DELETE | `/saved/scholarship/:id` | Unsave scholarship |
| DELETE | `/saved/internship/:id` | Unsave internship |
| DELETE | `/saved/university/:id` | Unsave university |
| GET | `/saved` | Get all saved items |

### **Feedback Endpoints** (`/feedback`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/feedback/track` | Track user interaction |
| GET | `/feedback` | Get user feedback (admin) |

### **Admin Endpoints** (`/admin`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | Get dashboard analytics |
| GET | `/admin/users` | List all users (admin) |
| GET | `/admin/analytics` | Get detailed analytics (admin) |

---

## 🗄️ Database Schema

### **Core Tables**

#### **Users**
```
- id (UUID)
- email (unique)
- firstName
- lastName
- dateOfBirth
- gender
- phoneNumber
- profilePictureUrl
- academicStream (Science/Social)
- createdAt
- updatedAt
```

#### **AuthUsers**
```
- id (UUID)
- userId (FK)
- passwordHash
- loginAttempts
- lastLogin
- isActive
- createdAt
- updatedAt
```

#### **Scholarships**
```
- id (UUID)
- name
- description
- fundingType (Full/Partial)
- location (Cambodia/Abroad)
- university (if applicable)
- applicationDeadline
- logo
- website
- createdAt
- updatedAt
```

**Related Tables:**
- `ScholarshipEligibility` - Eligibility criteria
- `ScholarshipBenefit` - Benefits offered
- `ScholarshipDeadline` - Application deadlines
- `ScholarshipFieldOfStudy` - Applicable majors

#### **Internships**
```
- id (UUID)
- title
- company
- description
- location
- duration
- salary (if paid)
- startDate
- applicationDeadline
- createdAt
- updatedAt
```

**Related Tables:**
- `InternshipEligibility`
- `InternshipBenefit`
- `InternshipDeadline`
- `InternshipFieldOfStudy`

#### **Universities**
```
- id (UUID)
- name
- description
- location
- website
- foundedYear
- studentCount
- logo
- createdAt
- updatedAt
```

**Related Tables:**
- `UniversityMajor` - Majors offered
- `UniversityTuitionFee` - Tuition information
- `UniversityCampus` - Campus locations
- `UniversityNews` - University news
- `UniversityStudentAchievement` - Student achievements

#### **Majors**
```
- id (UUID)
- name (e.g., "IT & Computer Science")
- description
- category
- createdAt
- updatedAt
```

**12 Predefined Majors:**
1. IT & Computer Science
2. Engineering
3. Health & Medical Sciences
4. Agriculture & Environmental
5. Architecture & Urban Planning
6. Business & Economics
7. Education
8. Arts & Media
9. Law & Legal Studies
10. Social Sciences
11. Tourism & Hospitality
12. Languages & Literature

#### **UserFeedback** (For AI Training)
```
- id (UUID)
- userId (FK)
- scholarshipId (FK, nullable)
- internshipId (FK, nullable)
- universityId (FK, nullable)
- interactionType (view/save/apply)
- createdAt
```

#### **RecommendationProfile**
```
- id (UUID)
- userId (FK)
- grades (JSON) - { subject: score }
- academicStream
- majorScores (JSON) - { major: score }
- createdAt
- updatedAt
```

#### **Saved** (Bookmarks)
```
- id (UUID)
- userId (FK)
- scholarshipId (FK, nullable)
- internshipId (FK, nullable)
- universityId (FK, nullable)
- createdAt
```

---

## 🤖 AI Recommendation System

### **Overview**

The AI recommendation system uses a custom machine learning model hosted on Hugging Face to provide intelligent scholarship and major recommendations based on student academic profiles.

### **How It Works**

#### **Step 1: Student Profile Input**
Students provide:
- Academic stream: Science or Social Studies
- Grades in 10 subjects: Math, Biology, Chemistry, Physics, Khmer, History, Geography, Moral Civics, Earth Science, English

#### **Step 2: Feature Engineering**
- Convert letter grades to numeric scale:
  - A = 5.0, B = 4.0, C = 3.0, D = 2.0, E = 1.0, F = 0.0
- Create feature vector: [Math, Biology, Chemistry, Physics, Khmer, History, Geography, Moral Civics, Earth Science, English, Stream]
- 11 numeric features total

#### **Step 3: Model Inference**
- Send features to Hugging Face Inference API
- Model: `leangchheng27/Cambodia-Scholarship-Portal`
- Returns scores (0-100%) for all 12 major fields

#### **Step 4: Ranking & Recommendations**
- Sort majors by score (highest first)
- Filter scholarships by top-matched majors
- Rank scholarships by relevance
- Return top 5-10 recommendations

### **Recommendation API Usage**

**Predict Student Majors:**
```javascript
POST /recommendations/predict-major
Body: {
  academicStream: "Science",
  grades: {
    "Math": "A",
    "Biology": "B",
    "Chemistry": "A",
    "Physics": "B",
    "Khmer": "C",
    "History": "C",
    "Geography": "B",
    "MoralCivics": "B",
    "EarthScience": "A",
    "English": "B"
  }
}

Response: {
  majorScores: [
    { major: "IT & Computer Science", score: 92 },
    { major: "Engineering", score: 88 },
    { major: "Health & Medical Sciences", score: 75 },
    ...
  ]
}
```

**Get Recommended Scholarships:**
```javascript
GET /recommendations/scholarships/:userId

Response: {
  recommendations: [
    {
      scholarship: { ... },
      matchScore: 85,
      reasonForMatch: "Matches your strengths in Science"
    },
    ...
  ]
}
```

### **Model Training & Improvement**

The model can be continuously improved using real user feedback:

#### **Training Data Collection**
- User interactions (views, saves, applications) tracked in `UserFeedback` table
- Stored as user-opportunity pairs with interaction signals

#### **Data Export**
```bash
npm run export-training-data
```
Exports `UserFeedback` data for model retraining

#### **Model Fine-tuning**
```bash
python scripts/finetune_model.py --data training_data.json
```
Updates the Hugging Face model with new data

### **Current Model Performance**

- **Model Name**: `leangchheng27/Cambodia-Scholarship-Portal`
- **Majors Predicted**: 12 fields
- **Accuracy Metrics**: Tracked in dashboard analytics
- **Last Updated**: [Check admin dashboard]

### **Frontend Integration**

Frontend fetches recommendations via API:

```javascript
// src/api/recommendationApi.js
import { HfInference } from "@huggingface/inference";

async function getRecommendations(studentProfile) {
  const response = await api.post('/recommendations/predict-major', studentProfile);
  return response.data.majorScores;
}
```

---

## 👨‍💼 Admin Features

### **Admin Dashboard Access**

1. Login with admin credentials
2. Navigate to `/admin` (if using admin panel)
3. Or access via backend admin endpoints

### **Content Management**

#### **Manage Scholarships**
- Add new scholarships with:
  - Basic info (name, description, logo)
  - Funding type (Full/Partial)
  - Location (Cambodia/Abroad)
  - Deadlines
  - Eligibility criteria
  - Benefits
  - Applicable majors

#### **Manage Internships**
- Add internships with:
  - Company and position details
  - Duration and salary
  - Application deadlines
  - Eligibility requirements
  - Field specializations

#### **Manage Universities**
- Add universities with:
  - Basic info and location
  - Available majors
  - Tuition fees
  - Campus locations
  - News and updates
  - Student achievements

### **Analytics & Reporting**

#### **Dashboard Metrics**
- Total registered students
- Popular scholarships/internships
- AI recommendation accuracy
- User engagement statistics
- Major distribution among recommendations

#### **Export Data**
- Export user feedback data
- Export analytics reports
- Export training data for model improvement

### **User Management**

- View all registered users
- View user profiles and grades
- Track user engagement
- Disable/activate accounts (if needed)

---

## 🚀 Deployment

### **Backend Deployment**

#### **Option 1: Heroku**

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Set environment variables
heroku config:set DB_HOST=your_db_host
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

#### **Option 2: AWS EC2**

1. Launch EC2 instance (Ubuntu 22.04)
2. Install Node.js, MySQL, Git
3. Clone repository
4. Setup environment variables
5. Start backend with PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js --name "csp-backend"
   pm2 save
   ```
6. Configure Nginx as reverse proxy

#### **Option 3: DigitalOcean App Platform**

1. Connect GitHub repository
2. Configure build and run commands
3. Set environment variables
4. Deploy from dashboard

### **Frontend Deployment**

#### **Option 1: Vercel**

```bash
npm install -g vercel
vercel deploy
```

#### **Option 2: Netlify**

```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

#### **Option 3: GitHub Pages**

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

### **Database Deployment**

#### **AWS RDS**

1. Create MySQL instance on RDS
2. Note database endpoint
3. Update backend `.env` with RDS credentials
4. Run migrations

#### **DigitalOcean Managed Database**

1. Create MySQL database cluster
2. Copy connection string
3. Update backend configuration
4. Sync models: `npm run sync-db`

### **Environment Configuration for Production**

**Backend (.env.production)**
```env
NODE_ENV=production
PORT=80
DB_HOST=production_db_host
DB_USER=prod_user
DB_PASSWORD=secure_password
JWT_SECRET=very_long_random_secret
FRONTEND_URL=https://yourdomain.com
GOOGLE_CALLBACK_URL=https://yourdomain.com/auth/google/callback
```

**Frontend (.env.production)**
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Cambodia Scholarship Portal
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### **Fork & Clone**
```bash
git clone https://github.com/yourusername/csp.git
cd csp
git checkout -b feature/your-feature
```

### **Development Workflow**

1. Create feature branch from `main`
2. Keep commits concise and descriptive
3. Push to your fork
4. Create pull request with clear description

### **Code Standards**

- Use ES6+ syntax
- Follow existing code style
- Add comments for complex logic
- Ensure no console errors/warnings
- Test on multiple browsers/devices

### **Testing**

```bash
# Backend tests (if applicable)
cd back-end
npm test

# Frontend tests (if applicable)
cd front-end
npm test
```

### **Pull Request Process**

1. Update README if needed
2. Describe changes clearly
3. Reference any related issues
4. Request review from team members
5. Address review comments

---

## 🐛 Troubleshooting

### **Backend Issues**

#### **Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

#### **Database Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

Solutions:
1. Verify MySQL is running
2. Check database credentials in `.env`
3. Verify database exists: `SHOW DATABASES;`
4. Check user permissions: `SELECT user();`

#### **JWT Token Errors**
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration: default 7 days
- Clear browser localStorage and retry login

### **Frontend Issues**

#### **API Connection Failed**
```
Error: Cannot reach http://localhost:5000
```

Solutions:
1. Verify backend is running
2. Check `VITE_API_URL` in `.env`
3. Verify CORS is enabled in backend

#### **Vite Build Errors**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

#### **Google OAuth Not Working**
- Verify Google Client ID in `.env`
- Check OAuth callback URL in Google Cloud Console
- Ensure redirect URL matches exactly

### **Database Issues**

#### **Sequelize Sync Fails**
```bash
# Check models
npm run sync-db -- --force  # WARNING: Drops all tables!

# Or manually create database
mysql -u root -p
CREATE DATABASE capstone_db CHARACTER SET utf8mb4;
```

#### **Foreign Key Errors**
- Ensure models are properly defined with associations
- Check model relationships in `src/models/`
- Verify constraint order in migrations

### **Email Not Sending**

#### **Gmail Issues**
1. Verify 2FA is enabled
2. Generate [App Password](https://myaccount.google.com/apppasswords)
3. Use App Password instead of regular password
4. Check Gmail "Less secure apps" not blocking

#### **Test Email**
```bash
node -e "require('./src/utils/mailer.js').sendEmail('test@example.com', 'Test Subject', 'Test Body')"
```

### **Performance Issues**

#### **Slow Recommendations**
- Check network connection
- Verify Hugging Face API is responsive
- Consider caching recommendation results
- Monitor API rate limits

#### **Database Slow Queries**
- Add indexes to frequently queried columns
- Optimize queries in repositories
- Monitor query logs

### **Common Error Messages**

| Error | Cause | Solution |
|-------|-------|----------|
| `ENOTFOUND localhost:3306` | MySQL not running | Start MySQL service |
| `ER_ACCESS_DENIED_FOR_USER` | Wrong DB credentials | Check `.env` file |
| `CORS error` | Backend CORS not enabled | Check CORS middleware |
| `401 Unauthorized` | Invalid/expired token | Login again |
| `404 Not Found` | Endpoint doesn't exist | Check API documentation |

---

## 📞 Support & Contact

For issues and questions:

- **GitHub Issues**: [Create an issue](https://github.com/yourorganization/csp/issues)
- **Email**: support@cambodiascholarshipportal.com
- **Documentation**: Check [Wiki](https://github.com/yourorganization/csp/wiki)

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Hugging Face** - ML model hosting and inference
- **Express.js** - Backend framework
- **React** - Frontend library
- **Sequelize** - ORM
- **Contributors** - All team members who contributed to this project

---

## 📈 Project Status

- **Version**: 1.0.0
- **Status**: Production Ready
- **Last Updated**: March 2026
- **Next Features**: Mobile app, Advanced analytics, Multi-language support

---

## 🗂️ Additional Resources

### Useful Documentation

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev)
- [Sequelize Docs](https://sequelize.org/)
- [Hugging Face API](https://huggingface.co/docs/api-inference)
- [MySQL Docs](https://dev.mysql.com/doc/)

### Related Files

- [Backend Environment Example](./back-end/.env.example)
- [Frontend Environment Example](./front-end/.env.example)
- [Database Schema Diagram](./docs/database-schema.md)
- [API Reference](./docs/api-reference.md)
- [Architecture Overview](./docs/architecture.md)

---

**Made with ❤️ for Cambodian Students**
