import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Colleges API
export const getColleges = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.location) params.append("location", filters.location);
  if (filters.course) params.append("course", filters.course);
  if (filters.minFee) params.append("minFee", filters.minFee);
  if (filters.maxFee) params.append("maxFee", filters.maxFee);
  if (filters.search) params.append("search", filters.search);
  if (filters.sortBy) params.append("sortBy", filters.sortBy);

  const response = await api.get(`/colleges?${params.toString()}`);
  return response.data;
};

// Reviews API
export const getReviews = async () => {
  const response = await api.get("/reviews");
  return response.data;
};

export const addReview = async (reviewData) => {
  const response = await api.post("/reviews", reviewData);
  return response.data;
};

// Favorites API
export const getFavorites = async () => {
  const response = await api.get("/favorites");
  return response.data;
};

export const addToFavorites = async (collegeId) => {
  const response = await api.post("/favorites", { collegeId });
  return response.data;
};

export const removeFromFavorites = async (collegeId) => {
  const response = await api.delete(`/favorites/college/${collegeId}`);
  return response.data;
};

export default api;
