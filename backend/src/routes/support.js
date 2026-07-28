const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createTicket, getUserTickets, getTicket, replyToTicket, closeTicket } = require('../controllers/supportController');

router.use(protect);
router.post('/tickets', createTicket);
router.get('/tickets', getUserTickets);
router.get('/tickets/:id', getTicket);
router.post('/tickets/:id/reply', replyToTicket);
router.patch('/tickets/:id/close', closeTicket);

module.exports = router;
