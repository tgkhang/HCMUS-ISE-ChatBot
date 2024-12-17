const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY,
});

router.post("/", async (req, res) => {
    try {
        // Set headers for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const stream = await openai.chat.completions.create({
            messages: [
                { 
                    "role": "system", 
                    "content": "You are a helpful assistant." 
                },
                {
                    "role": "user",
                    "content": req.body.prompt
                }
            ],
            model: "gpt-4o-mini",
            stream: true, // Enable streaming
            temperature: 0.7,
            max_tokens: 1000,
        });

        // Stream the response
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
        }

        // End the stream
        res.write('data: [DONE]\n\n');
        res.end();

    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
    }
});

module.exports = router;