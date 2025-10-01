import express from 'express';
import Favorite from '../models/Favorite.js';
import College from '../models/College.js';
import { mockFavorites, mockColleges } from '../mockData.js';

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
    console.log('Using mock favorites as fallback');
    res.json(mockFavorites);
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
    console.error('Error adding favorite:', error);
    console.log('Using mock data - favorite not persisted');
    
    const { collegeId } = req.body;
    const userId = req.body.userId || 'default-user';
    
    // Find college in mock data
    const college = mockColleges.find(c => c._id === collegeId);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    
    // Check if already in favorites
    const exists = mockFavorites.find(f => f.collegeId._id === collegeId && f.userId === userId);
    if (exists) {
      return res.status(400).json({ message: 'College already in favorites' });
    }
    
    const mockFavorite = {
      _id: `f${Date.now()}`,
      collegeId: college,
      userId,
      createdAt: new Date(),
    };
    
    mockFavorites.push(mockFavorite);
    res.status(201).json(mockFavorite);
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
    console.error('Error deleting favorite:', error);
    console.log('Using mock data - removing from memory');
    
    // Remove from mock data
    const index = mockFavorites.findIndex(f => f._id === req.params.id);
    if (index > -1) {
      mockFavorites.splice(index, 1);
      return res.json({ message: 'Removed from favorites' });
    }
    
    res.status(404).json({ message: 'Favorite not found' });
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
    console.error('Error deleting favorite by college ID:', error);
    console.log('Using mock data - removing from memory');
    
    const userId = req.query.userId || 'default-user';
    const index = mockFavorites.findIndex(f => 
      f.collegeId._id === req.params.collegeId && f.userId === userId
    );
    
    if (index > -1) {
      mockFavorites.splice(index, 1);
      return res.json({ message: 'Removed from favorites' });
    }
    
    res.status(404).json({ message: 'Favorite not found' });
  }
});

export default router;
