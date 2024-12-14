const express = require('express');
const router = express.Router();
const { getChatPage } = require('../controllers/chat');
const { Chat } = require('../database/models');

// Route để nhận dữ liệu từ query string
router.get('/', getChatPage);

// Save chat
router.post('/save', async (req, res) => {
    try {
        const { chatName, messages } = req.body;
        const chat = await Chat.create({
            userId: req.user.id,
            chatName,
            messages
        });
        res.json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save chat' });
    }
});

// Get chat history
router.get('/history', async (req, res) => {
    try {
        const chats = await Chat.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load chat history' });
    }
});

// Thêm route để lấy chi tiết của một chat
router.get('/:id', async (req, res) => {
    try {
        const chat = await Chat.findOne({
            where: { 
                id: req.params.id,
                userId: req.user.id 
            }
        });
        
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        
        res.json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load chat' });
    }
});

// Thêm route để xóa chat
router.delete('/:id', async (req, res) => {
    try {
        const result = await Chat.destroy({
            where: { 
                id: req.params.id,
                userId: req.user.id  // Đảm bảo chỉ xóa chat của user hiện tại
            }
        });
        
        if (result === 0) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        
        res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete chat' });
    }
});

module.exports = router;
