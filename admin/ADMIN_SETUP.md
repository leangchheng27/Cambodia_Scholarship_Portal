# Cambodia Scholarship Portal - Admin System Setup

## Project Structure

The admin system consists of two independent applications:

```
admin/
├── (Frontend - React)
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── back-end/
    └── (Backend - Node.js/Express)
        ├── src/
        ├── index.js
        ├── package.json
        └── .env
```

## Running The Admin System

### Prerequisites
- Node.js v16+ installed
- MySQL database running and accessible
- Database name: `capstone_db` (or update .env file)

### 1. Install Dependencies

**Frontend:**
```bash
cd admin
npm install
```

**Backend:**
```bash
cd admin/back-end
npm install
```

### 2. Configure Environment Variables

The `.env` file is already created at `admin/back-end/.env`. Update database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=capstone_db
JWT_SECRET=your-secret-key
ADMIN_PORT=3001
ADMIN_FRONTEND_URL=http://localhost:5174
```

### 3. Start Both Applications

**Option A: Run in Separate Terminals**

Terminal 1 - Admin Backend (Port 3001):
```bash
cd admin/back-end
npm run dev
```

Terminal 2 - Admin Frontend (Port 5174):
```bash
cd admin
npm run dev
```

**Option B: Run Both from Admin Root (in parallel)**
```bash
# Terminal 1
npm run dev

# Terminal 2
cd back-end && npm run dev
```

### 4. Access Admin Portal

Once both applications are running:
- **Frontend URL**: http://localhost:5174
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs

### Admin Login
- Use credentials exported from main system
- Default admin account created during database seeding

## Available Scripts

### Frontend (admin/)
- `npm run dev` - Start development server on port 5174
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend (admin/back-end/)
- `npm run dev` - Start with nodemon (auto-reload on changes)
- `npm start` - Start production server
- `npm run sync-db` - Synchronize database schema

## Admin Features

### Dashboard
- System statistics and analytics
- AI matching algorithm insights
- User engagement metrics

### Management Sections
- **Users**: Create, read, update, delete user accounts
- **Universities**: Manage universities and programs
- **Scholarships**: Handle scholarship information (domestic/abroad)
- **Internships**: Manage internship opportunities

### Authentication
- JWT-based admin authentication
- Google OAuth integration available
- Admin role verification on all endpoints

## Database

The admin backend uses the **same MySQL database** as the main system (`capstone_db`).

### Key Tables
- `auth_users` - User accounts with roles
- `universities` - University information
- `scholarships` - Scholarship listings
- `internships` - Internship opportunities
- `ai_feedback` - AI model training data

## API Endpoints

Base URL: `http://localhost:3001`

### Authentication
- `POST /auth/login` - Admin login
- `POST /auth/logout` - Logout
- `GET /auth/profile` - Get current admin profile

### Admin Operations (Protected)
- `GET /admin/users` - List all users
- `GET /admin/dashboard` - Dashboard statistics
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user
- `GET /admin/universities` - List universities
- `POST /admin/scholarships` - Create scholarship
- `PUT /admin/internships/:id` - Update internship

## Troubleshooting

### Port Already in Use
```bash
# Windows - Find and kill process on port
Get-Process | Where-Object { $_.Port -eq 3001 }
Stop-Process -Id <PID> -Force

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

### Database Connection Error
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `capstone_db` exists

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

## Development Notes

- Admin frontend and backend are **completely independent** from the user system
- Admin backend connects to the **same database** as the main system
- Both systems can run simultaneously without conflicts
- Admin API runs on **port 3001**
- Admin frontend runs on **port 5174**
- Main user frontend runs on **port 5173**
- Main user backend runs on **port 3000**

## Deployment

For production deployment:
1. Build frontend: `npm run build` in `admin/`
2. Update `.env` with production database and JWT secret
3. Start backend: `npm start` in `admin/back-end/`
4. Serve frontend build with your hosting platform

## Support

For issues or questions, refer to the main project documentation or check the API swagger docs at `/api-docs`.
