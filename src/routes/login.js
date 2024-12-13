const express = require('express');
const router = express.Router();
const {getLoginPage, handleLogin} = require('../controllers/login')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', getLoginPage);
router.post('/', handleLogin);

// Add these routes for OAuth
// router.get('/auth/google', handleGoogleAuth);
// router.get('/auth/apple', handleAppleAuth);

module.exports = router;

