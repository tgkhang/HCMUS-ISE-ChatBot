const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// Initialize OpenAI API client
const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // API Key của bạn
});

router.post("/", async (req, res) => {
    try {
        // Set headers for SSE (Server-Sent Events)
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Make a request to OpenAI API
        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Thay đổi mô hình về `gpt-4o-mini` theo đúng tài liệu OpenAI
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant." // Nội dung hệ thống
                },
                {
                    role: "user",
                    content: req.body.prompt // Nội dung người dùng nhập vào
                }
            ],
            stream: true, // Bật chế độ streaming
            temperature: 0.7, // Tùy chọn: Độ sáng tạo của phản hồi
            max_tokens: 500 // Tùy chọn: Giới hạn số token
        });

        // Handle the streaming response
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`); // Gửi từng phần response
            }
        }

        // Kết thúc stream
        res.write('data: [DONE]\n\n');
        res.end();

    } catch (error) {
        console.error("OpenAI API Error:", error.message);

        // Trả về lỗi trong stream
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
    }
});

module.exports = router;
