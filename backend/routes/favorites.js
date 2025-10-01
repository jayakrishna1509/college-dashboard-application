import express from 'express';
import Favorite from '../models/Favorite.js';
import College from '../models/College.js';

const router = express.Router();

// GET all favorites with populated college data
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    console.log('Fetching favorites for userId:', userId);
    
    const favorites = await Favorite.find({ userId }).populate({
      path: 'collegeId',
      match: { _id: { $exists: true } }
    });
    
    // Filter out favorites where college was deleted
    const validFavorites = favorites.filter(fav => fav.collegeId !== null);
    
    console.log(`Found ${validFavorites.length} valid favorites`);
    res.json(validFavorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: error.message, error: error.toString() });
  }
});

// POST add to favorites
router.post('/', async (req, res) => {
  try {
    const { collegeId } = req.body;
    const userId = req.body.userId || 'default-user';
    
    if (!collegeId) {
      return res.status(400).json({ message: 'College ID is required' });
    }
    
    // Check if college exists
    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    
    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({ collegeId, userId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'College already in favorites' });
    }
    
    const favorite = new Favorite({
      collegeId,
      userId,
    });
    
    const newFavorite = await favorite.save();
    const populatedFavorite = await Favorite.findById(newFavorite._id).populate('collegeId');
    res.status(201).json(populatedFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE remove from favorites
router.delete('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE remove favorite by college ID
router.delete('/college/:collegeId', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const favorite = await Favorite.findOneAndDelete({ 
      collegeId: req.params.collegeId, 
      userId 
    });
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
