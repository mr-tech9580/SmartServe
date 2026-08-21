const express = require('express');
const router = express.Router({ mergeParams: true }); // lets us access :ticketId from the parent route
const { protect } = require('../middleware/authMiddleware');
const { addComment, getComments } = require('../controllers/commentController');

router.post('/', protect, addComment);
router.get('/', protect, getComments);

module.exports = router;