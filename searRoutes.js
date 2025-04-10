const express = require('express');
const { getSeats, bookSeats, resetBooking } = require('../controllers/seatController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getSeats);
router.post('/book', authenticate, bookSeats);
router.post('/reset', authenticate, resetBooking);

module.exports = router;