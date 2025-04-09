// routes/authRoutes.js
const express = require('express');

const { protect } = require('../middleware/authmiddleware');
const { register, login, getUser, getAllUsers } = require('../controller/User.controller');

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route to get the authenticated user's details
router.get('/me', protect,getUser);
//route to get 
router.get("/users", protect, getAllUsers); // You can also add role-based access here

module.exports = router;
