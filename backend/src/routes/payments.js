const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { paymentLimiter } = require('../middleware/rateLimiter');
const { getSupportedCoins, createDeposit, verifyPayment, getUserPaymentRequests, getPaymentRequest, requestWithdrawal, getWithdrawals } = require('../controllers/paymentController');

router.get('/coins', getSupportedCoins);

router.use(protect);
router.post('/deposit', paymentLimiter, createDeposit);
router.post('/verify', paymentLimiter, verifyPayment);
router.get('/requests', getUserPaymentRequests);
router.get('/requests/:id', getPaymentRequest);
router.post('/withdraw', paymentLimiter, requestWithdrawal);
router.get('/withdrawals', getWithdrawals);

module.exports = router;
