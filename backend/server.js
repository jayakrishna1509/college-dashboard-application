import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import collegesRouter from "./routes/colleges.js";
import reviewsRouter from "./routes/reviews.js";
import favoritesRouter from "./routes/favorites.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/college-dashboard";

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local development
      "https://college-dashboard-application.vercel.app/", // Replace with your Vercel URL
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/colleges", collegesRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/favorites", favoritesRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server immediately (don't wait for MongoDB)
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 API available at: http://localhost:${PORT}/api`);
});

// Try to connect to MongoDB in background (optional)
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 3000,
    socketTimeoutMS: 3000,
    bufferCommands: false,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("⚠️  MongoDB not available - using mock data");
  });

export default app;
