const express = require('express');
const router = express.Router();
const { createTicket, getMyTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const commentRoutes = require('./commentRoutes');

router.post('/', protect, createTicket);
router.get('/my', protect, getMyTickets);
router.use('/:ticketId/comments', commentRoutes); // nested route

module.exports = router;