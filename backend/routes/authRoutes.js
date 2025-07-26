const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', upload.single('idDocument'), registerUser);
router.post('/login', loginUser);

module.exports = router;
