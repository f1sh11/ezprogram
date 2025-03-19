const express = require('express');
const { getProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Get current user information (protected route)
router.get('/me', authMiddleware, getProfile);

module.exports = router;
