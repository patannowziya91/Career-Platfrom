const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { updateProfile, getUserProfile } = require('../controllers/authProfileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.get('/profile/:id', getUserProfile);

module.exports = router;
