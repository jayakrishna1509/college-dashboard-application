import express from 'express';
import College from '../models/College.js';
import { mockColleges } from '../mockData.js';
const router = express.Router();

// GET all colleges with optional filters and search
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/colleges - Query params:', req.query);
    
    const { location, course, minFee, maxFee, search, sortBy } = req.query;
    
    let query = {};
    
    // Apply filters
    if (location) {
      query.location = location;
    }
    
    if (course) {
      query.course = course;
    }
    
    // Fee range filter
    if (minFee || maxFee) {
      query.fee = {};
      if (minFee) query.fee.$gte = Number(minFee);
      if (maxFee) query.fee.$lte = Number(maxFee);
    }
    
    // Search by college name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    console.log('MongoDB query:', JSON.stringify(query));
    
    let collegesQuery = College.find(query);
    
    // Sorting
    if (sortBy === 'fee-asc') {
      collegesQuery = collegesQuery.sort({ fee: 1 });
    } else if (sortBy === 'fee-desc') {
      collegesQuery = collegesQuery.sort({ fee: -1 });
    }
    
    const colleges = await collegesQuery;
    console.log(`Found ${colleges.length} colleges from database`);
    
    // If database is empty, use mock data
    if (colleges.length === 0) {
      console.log('Database is empty, using mock data');
      let filteredColleges = [...mockColleges];
      
      if (location) {
        filteredColleges = filteredColleges.filter(c => c.location === location);
      }
      if (course) {
        filteredColleges = filteredColleges.filter(c => c.course === course);
      }
      if (minFee) {
        filteredColleges = filteredColleges.filter(c => c.fee >= Number(minFee));
      }
      if (maxFee) {
        filteredColleges = filteredColleges.filter(c => c.fee <= Number(maxFee));
      }
      if (search) {
        filteredColleges = filteredColleges.filter(c => 
          c.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (sortBy === 'fee-asc') {
        filteredColleges.sort((a, b) => a.fee - b.fee);
      } else if (sortBy === 'fee-desc') {
        filteredColleges.sort((a, b) => b.fee - a.fee);
      }
      
      return res.json(filteredColleges);
    }
    
    res.json(colleges);
  } catch (error) {
    console.error('Error in GET /api/colleges:', error);
    console.log('Using mock data as fallback');
    
    // Use mock data as fallback
    let filteredColleges = [...mockColleges];
    
    const { location, course, minFee, maxFee, search, sortBy } = req.query;
    
    if (location) {
      filteredColleges = filteredColleges.filter(c => c.location === location);
    }
    if (course) {
      filteredColleges = filteredColleges.filter(c => c.course === course);
    }
    if (minFee) {
      filteredColleges = filteredColleges.filter(c => c.fee >= Number(minFee));
    }
    if (maxFee) {
      filteredColleges = filteredColleges.filter(c => c.fee <= Number(maxFee));
    }
    if (search) {
      filteredColleges = filteredColleges.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy === 'fee-asc') {
      filteredColleges.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === 'fee-desc') {
      filteredColleges.sort((a, b) => b.fee - a.fee);
    }
    
    res.json(filteredColleges);
  }
});

// GET single college by ID
router.get('/:id', async (req, res) => {
  try {
    console.log('GET /api/colleges/:id - ID:', req.params.id);
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.json(college);
  } catch (error) {
    console.error('Error in GET /api/colleges/:id:', error);
    res.status(500).json({ message: error.message, error: error.toString() });
  }
});

export default router;
