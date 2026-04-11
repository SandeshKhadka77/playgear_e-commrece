const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
router.get('/check', (req, res) => {
    res.send("If you see this, User Routes are connected!");
});
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @route   GET /api/users
// @desc    Get all users (admin only)
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Could not fetch users' });
    }
});

// 1. REGISTER ROUTE (This is what you need for Thunder Client)
// @route   POST /api/users
router.post('/', async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password, // This will be hashed by the 'pre-save' hook in  User Model
        isAdmin: isAdmin || false,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

// 2. LOGIN ROUTE
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports = router;