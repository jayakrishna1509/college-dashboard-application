import express from 'express';
import Review from '../models/Review.js';
import { mockReviews } from '../mockData.js';

const router = express.Router();

// GET all reviews
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/reviews');
    const reviews = await Review.find().sort({ createdAt: -1 });
    console.log(`Found ${reviews.length} reviews from database`);
    
    // If database is empty, use mock data
    if (reviews.length === 0) {
      console.log('Database is empty, using mock reviews');
      return res.json(mockReviews);
    }
    
    res.json(reviews);
  } catch (error) {
    console.error('Error in GET /api/reviews:', error);
    console.log('Using mock reviews as fallback');
    res.json(mockReviews);
  }
});

// POST a new review
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/reviews - Body:', req.body);
    const { collegeName, rating, comment } = req.body;
    
    if (!collegeName || !rating || !comment) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const review = new Review({
      collegeName,
      rating: Number(rating),
      comment,
    });
    
    const newReview = await review.save();
    console.log('Review created:', newReview._id);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error in POST /api/reviews:', error);
    console.log('Using mock data - review not persisted');
    
    // Return mock response
    const mockReview = {
      _id: `r${Date.now()}`,
      collegeName,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };
    
    mockReviews.unshift(mockReview);
    res.status(201).json(mockReview);
  }
});

export default router;
