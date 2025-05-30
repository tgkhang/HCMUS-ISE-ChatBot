'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');
const authController = require('../controllers/authController');

//apply middleware 
router.use(authController.isLoggedIn);

//tất cả những route liên quan đến /, đứng sau / -> sử dụng webRoute
const homeRoute = require('../routes/home');
router.use('/', homeRoute);

const chatRoute = require('../routes/chat');
router.use('/chat', chatRoute);

// kết nối AI engine:
const geminiRoute = require('../routes/api_gemini');
router.use('/api/gemini', geminiRoute);

const chatgptRoute = require('../routes/api_chatgpt');
router.use('/api/chatgpt', chatgptRoute);

const huggingfaceRoute = require('../routes/api_hunggingface');
router.use('/api/huggingface', huggingfaceRoute);

module.exports = router;