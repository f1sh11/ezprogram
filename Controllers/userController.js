// 获取当前登录用户的信息
exports.getProfile = (req, res) => {
    // authMiddleware 已验证用户并将用户对象附加在 req.user
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    // 返回用户信息（已经在中间件中过滤掉了密码等敏感信息）
    res.json(req.user);
  };
  