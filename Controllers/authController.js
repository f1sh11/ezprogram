const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 注册新用户并返回 JWT
exports.register = async (req, res) => {
  try {
    const { identifier, password, role } = req.body;
    // 简单校验
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Please provide identifier and password' });
    }
    // 检查用户是否已存在
    const userExists = await User.findOne({ identifier });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // 哈希密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // 创建新用户
    const newUser = await User.create({
      identifier,
      password: hashedPassword,
      role: role || 'user'
    });
    // 生成 JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 用户登录并返回 JWT
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // 检查用户是否存在
    const user = await User.findOne({ identifier });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // 校验密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // 生成 JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
