const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User =require("../models/User");

// Route: GET /api/users
router.get('/', async(req, res) => {
    const allusers=await User.find();
  res.send(allusers);
});

// Route: POST /api/users
router.post('/', async (req, res) => {
  const newUser = new User(req.body); // Assuming body-parser or express.json middleware is used
    await newUser.save();
  res.send(`User created: ${JSON.stringify(newUser)}`);
});

// Route: GET /api/users/:id
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Get user with ID: ${userId}`);
});

// Route: PUT /api/users/:id
router.put('/:id', async(req, res) => {
  try {
    const userId = req.params.id; // Access the ID parameter
    const updates = req.body; // The updates sent in the request body

    const updatedUser = await User.findByIdAndUpdate(
      userId,       // Find user by ID
      updates,      // Apply updates
      { new: true, runValidators: true } // Options: return updated doc & validate
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser); // Return the updated user
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;