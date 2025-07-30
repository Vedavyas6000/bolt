const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectCollege = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the college user by id
      const user = await User.findById(decoded.id);

      if (user) {
        user.role = 'college';
      }

      if (!user || user.role !== 'college') {
        return res.status(401).json({ message: 'Not authorized as a college' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protectCollege };
