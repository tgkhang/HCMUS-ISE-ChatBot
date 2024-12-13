const express = require('express');
const router = express.Router();
const {getHomePage} = require('../controllers/home');

// router.Method('/route', handler)
router.get('/', getHomePage);

router.get('/gemini', (req, res) => {
    res.render('index');
})

module.exports = router