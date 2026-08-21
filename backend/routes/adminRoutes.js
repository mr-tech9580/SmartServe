const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getAllTickets, getNextTicket, assignTicket, updateTicketStatus } = require('../controllers/adminController');
const { getCategoryBreakdown, getDuplicateTickets } = require('../controllers/analyticsController');

router.get('/tickets', protect, adminOnly, getAllTickets);
router.get('/tickets/next', protect, adminOnly, getNextTicket);
router.patch('/tickets/:id/assign', protect, adminOnly, assignTicket);
router.patch('/tickets/:id/status', protect, adminOnly, updateTicketStatus);

router.get('/analytics/category-breakdown', protect, adminOnly, getCategoryBreakdown);
router.get('/analytics/duplicate-check', protect, adminOnly, getDuplicateTickets);

module.exports = router;