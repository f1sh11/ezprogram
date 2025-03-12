const express = require('express');
const { getProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// 获取当前用户信息（受保护路由）
router.get('/me', authMiddleware, getProfile);

module.exports = router;
