const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getDashboard, getNotifications, markNotificationRead, markAllNotificationsRead, getLeaderboard, getReferralStats } = require('../controllers/userController');

router.use(protect);
router.get('/dashboard', getDashboard);
router.get('/notifications', getNotifications);
router.patch('/notifications/read-all', markAllNotificationsRead);
router.patch('/notifications/:id/read', markNotificationRead);
router.get('/referrals/leaderboard', getLeaderboard);
router.get('/referrals/stats', getReferralStats);

module.exports = router;
