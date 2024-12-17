const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

router.post("/", async (req, res) => {
    try {
        // Set headers for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const chat = model.startChat({
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessageStream(req.body.prompt);

        // Stream the response
        for await (const chunk of result.stream) {
            const content = chunk.text();
            if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
        }

        // End the stream
        res.write('data: [DONE]\n\n');
        res.end();

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
    }
});

module.exports = router;
