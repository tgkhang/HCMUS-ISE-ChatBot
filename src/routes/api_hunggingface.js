const express = require("express");
const router = express.Router();
const { HfInference } = require('@huggingface/inference');

// Khởi tạo HuggingFace client
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

router.post("/", async (req, res) => {
    try {
        if (!req.body.prompt) {
            return res.status(400).json({ error: "No prompt provided" });
        }

        const chatCompletion = await hf.chatCompletion({
            model: "meta-llama/Llama-2-7b-chat-hf",  // hoặc model khác tùy chọn
            messages: [
                { 
                    role: "system", 
                    content: "You are a helpful assistant that can answer questions about mathematics, code, and AI learning." 
                },
                { 
                    role: "user", 
                    content: req.body.prompt 
                }
            ],
            temperature: 0.5,
            max_tokens: 1000,
            top_p: 0.7
        });

        res.json({ 
            response: chatCompletion.choices[0].message.content 
        });

    } catch (error) {
        console.error("HuggingFace API Error:", error);
        res.status(500).json({ 
            error: "Error processing request",
            details: error.message 
        });
    }
});

module.exports = router;
