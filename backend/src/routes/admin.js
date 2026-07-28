const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getAdminDashboard, getUsers, updateUser, getDeposits, getWithdrawals, processWithdrawal, getTickets, replyToTicket, createAnnouncement, getRevenueStats } = require('../controllers/adminController');
const { createBlogPost, updateBlogPost, deleteBlogPost } = require('../controllers/blogController');

router.use(protect, authorize('admin', 'superadmin'));

router.get('/dashboard', getAdminDashboard);
router.get('/revenue', getRevenueStats);
router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.get('/deposits', getDeposits);
router.get('/withdrawals', getWithdrawals);
router.patch('/withdrawals/:id', processWithdrawal);
router.get('/tickets', getTickets);
router.post('/tickets/:id/reply', replyToTicket);
router.post('/announcements', createAnnouncement);
router.post('/blog', createBlogPost);
router.patch('/blog/:id', updateBlogPost);
router.delete('/blog/:id', deleteBlogPost);

module.exports = router;
