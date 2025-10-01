# 🎓 College Dashboard Application

A full-stack web application to explore, filter, review, and save your favorite colleges. Built with React, Node.js, Express, and MongoDB.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

## ✨ Features

### Core Functionality
- 🏫 **College Listings** - Browse comprehensive college database
- 🔍 **Advanced Search** - Search colleges by name in real-time
- 🎯 **Smart Filters** - Filter by location, course, and fee range
- 📊 **Sorting** - Sort colleges by fee (low to high, high to low)
- ❤️ **Favorites** - Save colleges to favorites with persistent storage
- ⭐ **Reviews** - Add and view college reviews with ratings
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on all devices

### Additional Features
- Beautiful, modern UI with Tailwind CSS
- Smooth animations and transitions
- Loading states and error handling
- Persistent data storage with MongoDB
- RESTful API architecture

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📁 Project Structure

```
college-dashboard-application/
├── backend/
│   ├── models/
│   │   ├── College.js
│   │   ├── Review.js
│   │   └── Favorite.js
│   ├── routes/
│   │   ├── colleges.js
│   │   ├── reviews.js
│   │   └── favorites.js
│   ├── .env.example
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Colleges.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── Favorites.jsx
│   │   │   └── Logout.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd college-dashboard-application
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   # Create .env file in backend directory
   cp .env.example .env
   ```

   Update `.env` with your MongoDB connection string:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/college-dashboard
   NODE_ENV=development
   ```

4. **Seed the Database**
   ```bash
   npm run seed
   ```

5. **Start Backend Server**
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

6. **Set up Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

7. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

8. **Open your browser**
   Navigate to `http://localhost:3000`

## 📡 API Endpoints

### Colleges
- `GET /api/colleges` - Get all colleges (supports query params)
  - Query params: `location`, `course`, `minFee`, `maxFee`, `search`, `sortBy`
- `GET /api/colleges/:id` - Get single college by ID

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Add a new review
  - Body: `{ collegeName, rating, comment }`

### Favorites
- `GET /api/favorites` - Get all favorites
- `POST /api/favorites` - Add to favorites
  - Body: `{ collegeId }`
- `DELETE /api/favorites/:id` - Remove from favorites by favorite ID
- `DELETE /api/favorites/college/:collegeId` - Remove from favorites by college ID

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```
   
   Or **Deploy to Netlify**
   ```bash
   netlify deploy --prod
   ```

3. **Configure environment variables**
   - Add `VITE_API_URL` pointing to your backend URL

### Backend Deployment (Render/Railway)

1. **Deploy to Render**
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables (MongoDB URI, PORT)

2. **Or deploy to Railway**
   ```bash
   railway up
   ```

### MongoDB Atlas (Cloud Database)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update backend `.env` with Atlas connection string

## 📸 Screenshots

### Home Page
Modern landing page with call-to-action and feature highlights.

### Colleges Page
Grid view of colleges with advanced filters, search, and sorting.

### Reviews Page
Submit and view college reviews with star ratings.

### Favorites Page
Manage your saved colleges in one place.

### Dark Mode
Complete dark mode support throughout the application.

## 🎯 Sample Data

The application comes with seed data including:
- 12 colleges across 3 cities (Hyderabad, Bangalore, Chennai)
- 4 courses (Computer Science, Electronics, MBA, MBBS)
- Fee ranges from ₹90,000 to ₹280,000

## 📝 Development Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern dashboard designs
- Built with ❤️ for college students

---

**Note:** Make sure MongoDB is running before starting the application. For local development, you can use MongoDB Community Edition or MongoDB Atlas for cloud hosting.
