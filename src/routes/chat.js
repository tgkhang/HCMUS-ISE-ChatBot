const express = require('express');
const router = express.Router();
const { getChatPage } = require('../controllers/chat');

// Route để nhận dữ liệu từ query string
router.get('/', getChatPage);

module.exports = router;
