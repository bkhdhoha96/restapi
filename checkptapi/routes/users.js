const express = require('express');
const User = require('../models/user');

const router = express.Router();

// GET: Return all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST: Add a new user to the database
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT: Edit a user by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE: Remove a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
