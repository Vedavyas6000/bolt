const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/eventController');
const { protectCollege } = require('../middleware/authMiddleware'); // Assuming auth middleware exists

// Route to create a new event (poster) for a college
router.post('/', protectCollege, createEvent);

module.exports = router;
