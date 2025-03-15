const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
  let token;
  // Get the token from the request header and format check it
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Verifying Token Validity
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user information based on the user ID in the token and exclude the password field
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      // Validation passes, invoke next step
      return next();
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  // No token provided
  return res.status(401).json({ message: 'No token, authorization denied' });
};
