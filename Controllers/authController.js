const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user and return to JWT
exports.register = async (req, res) => {
  try {
    const { identifier, password, role } = req.body;
    // simple calibration
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Please provide identifier and password' });
    }
    // Check if the user already exists
    const userExists = await User.findOne({ identifier });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create New User
    const newUser = await User.create({
      identifier,
      password: hashedPassword,
      role: role || 'user'
    });
    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User login and return JWT
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ identifier });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
