import mongoose from "mongoose";
import dotenv from "dotenv";
import College from "./models/College.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/college-dashboard";

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 second timeout
  socketTimeoutMS: 45000, // 45 second timeout
  family: 4, // Force IPv4
};

const colleges = [
  {
    name: "ABC Engineering College",
    location: "Hyderabad",
    course: "Computer Science",
    fee: 120000,
  },
  {
    name: "XYZ Institute of Technology",
    location: "Bangalore",
    course: "Electronics",
    fee: 100000,
  },
  {
    name: "Sunrise Business School",
    location: "Chennai",
    course: "MBA",
    fee: 150000,
  },
  {
    name: "Greenfield Medical College",
    location: "Hyderabad",
    course: "MBBS",
    fee: 250000,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await College.deleteMany({});
    console.log("Cleared existing colleges");

    // Insert seed data
    await College.insertMany(colleges);
    console.log("Seed data inserted successfully");

    mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
