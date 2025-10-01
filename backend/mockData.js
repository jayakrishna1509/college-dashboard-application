// Mock data for quick testing without MongoDB
export const mockColleges = [
  {
    _id: "1",
    name: "ABC Engineering College",
    location: "Hyderabad",
    course: "Computer Science",
    fee: 120000,
  },
  {
    _id: "2",
    name: "XYZ Institute of Technology",
    location: "Bangalore",
    course: "Electronics",
    fee: 100000,
  },
  {
    _id: "3",
    name: "Sunrise Business School",
    location: "Chennai",
    course: "MBA",
    fee: 150000,
  },
  {
    _id: "4",
    name: "Greenfield Medical College",
    location: "Hyderabad",
    course: "MBBS",
    fee: 250000,
  },
];

export const mockReviews = [
  {
    _id: "r1",
    collegeName: "ABC Engineering College",
    rating: 5,
    comment: "Excellent infrastructure and faculty. Highly recommended!",
    createdAt: new Date("2024-01-15"),
  },
  {
    _id: "r2",
    collegeName: "XYZ Institute of Technology",
    rating: 4,
    comment: "Good college with decent placement opportunities.",
    createdAt: new Date("2024-02-10"),
  },
  {
    _id: "r3",
    collegeName: "PQR Medical College",
    rating: 5,
    comment: "Best medical college in the region. Great hospital facilities.",
    createdAt: new Date("2024-03-05"),
  },
  {
    _id: "r4",
    collegeName: "LMN Business School",
    rating: 4,
    comment: "Strong industry connections and experienced professors.",
    createdAt: new Date("2024-03-20"),
  },
  {
    _id: "r5",
    collegeName: "DEF Engineering College",
    rating: 3,
    comment: "Average college, needs improvement in labs.",
    createdAt: new Date("2024-04-12"),
  },
];

export const mockFavorites = [];
