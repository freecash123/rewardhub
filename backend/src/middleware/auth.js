const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../models');
const { AppError } = require('../utils/errors');

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }
    if (!token) return next(new AppError('Not authenticated. Please log in.', 401));
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError('User no longer exists.', 401));
    if (!user.isActive) return next(new AppError('Account has been deactivated.', 403));
    if (user.isLocked()) return next(new AppError('Account is temporarily locked. Try again later.', 423));
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') return next(new AppError('Invalid token. Please log in again.', 401));
    if (error.name === 'TokenExpiredError') return next(new AppError('Token expired. Please log in again.', 401));
    next(error);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }
    next();
  };
};

const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }
    if (token) {
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    }
  } catch (error) {}
  next();
};

module.exports = { protect, authorize, optionalAuth };
