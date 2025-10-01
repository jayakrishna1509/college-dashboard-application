# 🚀 Quick Setup Guide

Follow these steps to get the College Dashboard application running locally.

## Prerequisites

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **MongoDB** v5 or higher ([Download](https://www.mongodb.com/try/download/community))
- **npm** or **yarn** (comes with Node.js)

## Step-by-Step Setup

### 1. Install MongoDB

**Windows:**
- Download MongoDB Community Server
- Install and start MongoDB service
- Default connection: `mongodb://localhost:27017`

**Mac (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Clone and Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env
# or on Mac/Linux: cp .env.example .env

# Edit .env file and set:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/college-dashboard

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

### 3. Setup Frontend

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# (Optional) Create .env file for custom API URL
copy .env.example .env
# Default API URL is already configured in vite.config.js

# Start the frontend development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Verify Installation

1. **Backend Health Check:**
   ```
   http://localhost:5000/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Frontend:**
   - Home page should load with hero section
   - Navigate to "Colleges" to see the list of colleges
   - Try filters and search functionality

## Common Issues & Solutions

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running
- Check connection string in `backend/.env`
- Try: `mongodb://127.0.0.1:27017/college-dashboard`

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update `frontend/vite.config.js` proxy target accordingly

### CORS Errors

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Ensure backend is running
- Check proxy configuration in `frontend/vite.config.js`

### Dependencies Installation Failed

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Development Scripts

### Backend
```bash
npm start       # Production mode
npm run dev     # Development mode with auto-reload
npm run seed    # Seed database with sample data
```

### Frontend
```bash
npm run dev     # Development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Next Steps

1. ✅ Explore the Colleges page with filters
2. ✅ Add colleges to your favorites
3. ✅ Submit a review
4. ✅ Toggle dark mode
5. ✅ Test responsive design on mobile

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review API endpoints in the README
- Check browser console for errors
- Ensure all dependencies are installed correctly

---

**Happy Coding! 🎓**
