import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// GET all reviews
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/reviews');
    const reviews = await Review.find().sort({ createdAt: -1 });
    console.log(`Found ${reviews.length} reviews`);
    res.json(reviews);
  } catch (error) {
    console.error('Error in GET /api/reviews:', error);
    res.status(500).json({ message: error.message, error: error.toString() });
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
    res.status(400).json({ message: error.message, error: error.toString() });
  }
});

export default router;
