'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');
const authController = require('../controllers/authController');

//apply middleware 
router.use(authController.isLoggedIn);

router.get('/home', controller.showHomepage);

router.get('/', (req, res) => {
    res.redirect('/home');
});

module.exports = router;