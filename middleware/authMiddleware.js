const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
  let token;
  // 从请求头获取令牌并进行格式校验
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // 验证令牌有效性
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // 根据令牌中的用户ID获取用户信息，并排除密码字段
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      // 验证通过，调用下一步
      return next();
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  // 未提供 token
  return res.status(401).json({ message: 'No token, authorization denied' });
};
