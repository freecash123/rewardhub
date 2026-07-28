const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimiter');
const { protect } = require('../middleware/auth');
const {
  register, login, verify2FA, verifyEmail, resendVerification,
  refreshTokenHandler, forgotPassword, resetPassword,
  getMe, updateProfile, enable2FA, verifyEnable2FA, disable2FA, logout,
} = require('../controllers/authController');

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/verify-2fa', verify2FA);
router.post('/verify-email', verifyEmail);
router.post('/refresh', refreshTokenHandler);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', resetPassword);

router.use(protect);
router.get('/me', getMe);
router.patch('/profile', updateProfile);
router.post('/enable-2fa', enable2FA);
router.post('/verify-enable-2fa', verifyEnable2FA);
router.post('/disable-2fa', disable2FA);
router.post('/resend-verification', resendVerification);
router.post('/logout', logout);

module.exports = router;
