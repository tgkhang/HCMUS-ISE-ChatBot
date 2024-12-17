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
            history: [
              {
                role: "user",
                parts: [
                  { text: "I want to create chat prompt" },
                ],
              },
              {
                role: "model",
                parts: [
                  { text: "Please tell me more about the chat prompt you want to create!  I need more information to help you.  For example:\n\n* **What is the purpose of the prompt?**  Is it for:\n    * Creative writing (storytelling, poetry, etc.)?\n    * Generating code?\n    * Translating languages?\n    * Summarizing text?\n    * Answering questions?\n    * Brainstorming ideas?\n    * Something else entirely?\n\n* **What kind of response are you hoping for?**  Should it be:\n    * Short and concise?\n    * Long and detailed?\n    * In a specific format (e.g., a list, a poem, code)?\n    * Formal or informal in tone?\n\n* **What is the context or topic of the prompt?**  For example:\n    * \"Write a short story about a robot who learns to love.\"\n    * \"Translate 'Hello, how are you?' into Spanish.\"\n    * \"Summarize the plot of Hamlet.\"\n    * \"Generate Python code to calculate the factorial of a number.\"\n\n* **Are there any specific keywords or phrases you want to include?**\n\n* **What platform or tool will you be using this prompt with?** (e.g., ChatGPT, Bard, a specific coding environment)  This can help me tailor the prompt to the specific nuances of that platform.\n\n\nThe more details you provide, the better I can assist you in crafting the perfect prompt.\n" },
                ],
              },
              {
                role: "user",
                parts: [
                  { text: "1. Purpose of the Prompt\nThe chatbot application is designed to:\n\nAnswer questions: Assist users in resolving questions across various domains, such as technology, lifestyle, education, etc.\nSummarize content: Help users summarize lengthy documents into key points.\nBrainstorm ideas: Provide creative ideas or solutions for specific problems.\nTranslate languages: Translate sentences or paragraphs from one language to another.\nEngage in creative interactions: Write short stories, poems, or creative dialogues.\nGenerate multimedia content: Create illustrative images or files (PDF, DOCX) to convey information effectively.\n2. Desired Response Format\nLength: Provide concise and clear responses for simple queries, and detailed explanations for complex topics.\nFormat: The responses can include:\nText: Bulleted lists, complete paragraphs, or code snippets (for programming-related queries).\nImages: Illustrations, diagrams, charts, or drawings related to the topic.\nFile Attachments: PDFs, DOCX, or CSV files containing summarized data or documents.\nTone:\nFriendly and approachable: For informal content.\nProfessional and formal: For academic or technical content.\n3. Context or Topics\nExamples of specific prompts the chatbot will handle:\n\n\"Summarize an article on climate change.\"\n\"Write a Python snippet to calculate the sum of numbers from 1 to 100.\"\n\"Translate 'Hello, how are you?' into Spanish.\"\n\"Provide creative business ideas in the tech industry.\"\n\"Write a short poem about friendship.\"\n\"Draw a diagram explaining how a neural network works.\"\n\"Generate a PDF summarizing the tech trends of 2024.\"\n4. Keywords and Phrases\nCommon phrases: \"Explain,\" \"Summarize,\" \"Write code,\" \"Translate,\" \"Generate ideas,\" \"Provide advice,\" \"Create an image,\" \"Export a file.\"\nPrimary topics: Programming, academics, content creation, language, lifestyle, skills, multimedia content.\n5. Platform or Tools\nPlatform: ChatGPT API or Gemini API.\nIntegration Goals: My application will utilize these APIs to build an AI chatbot for web and mobile platforms.\nComprehensive Description\nThe chatbot application aims to assist users in answering questions, summarizing content, brainstorming ideas, writing programming code, translating languages, and creating multimedia content. The bot's responses will be versatile, including text, visual illustrations, or file attachments (PDF, DOCX, CSV). The tone and style of the responses will be tailored to the context and purpose of user queries." },
                ],
              },
              {
                role: "model",
                parts: [
                  { text: "This is a great description of your chatbot's functionality!  Here's how we can approach creating effective prompts, given these requirements:\n\n**General Prompting Strategies:**\n\n* **Be Specific:** The more detail you give in your prompt, the better the results.  Don't just ask \"Write a poem.\"  Instead, try \"Write a short, rhyming poem about the feeling of nostalgia for childhood.\"\n* **Define the Output Format:** Explicitly state the desired format.  For example:  \"Summarize this article in three bullet points.\" or \"Generate Python code to achieve X, and provide it in a code block.\"  For multimedia, be very specific: \"Create an image of a futuristic cityscape in the style of cyberpunk, with flying cars and neon signs.\"\n* **Set the Tone:** Indicate the desired tone. Examples: \"Explain quantum physics in simple terms for a beginner.\" or \"Write a formal business letter requesting a meeting.\"\n* **Iterate and Refine:**  Experiment with different phrasings and keywords to see what yields the best results.  Don't be afraid to re-prompt if the initial output isn't satisfactory.\n\n**Example Prompts based on your use cases:**\n\n* **Summarization:**  \"Summarize the following text in five bullet points: [insert text here]\" or \"Provide a concise summary of the attached PDF document.\"\n* **Code Generation:** \"Write Python code to calculate the factorial of a number n.  Provide the code in a code block.\"  or \"Generate JavaScript code to create a simple HTML form with two input fields and a submit button.\"\n* **Translation:** \"Translate 'Hello, how are you?' into Spanish.\" or \"Translate the following paragraph into French, ensuring the translation maintains the original tone and meaning: [insert paragraph]\"\n* **Brainstorming:** \"Generate five creative business ideas related to sustainable energy.\" or \"Brainstorm marketing strategies for a new mobile app targeting teenagers.\"\n* **Creative Writing:** \"Write a short story about a robot who learns to love.\" or \"Compose a haiku about the beauty of nature.\"\n* **Multimedia Generation (Images):** \"Create an image of a cat wearing a top hat in a photorealistic style.\" or \"Generate an image depicting a serene mountain landscape at sunset.\"\n* **Multimedia Generation (Files):**  \"Create a PDF document summarizing the key features of the product described below: [product description].\"  This is challenging and may require intermediary steps or a different approach.  Generating complex formatted documents directly via a prompt is still an evolving area.\n\n\n**Handling File Attachments (PDFs, DOCX):**\n\nFor summarizing or processing uploaded files, you'll need to extract the text content from the files within your application before sending it to the API.  The prompt would then include the extracted text.  Direct file uploads are typically not supported within the prompt itself.\n\n**Key Considerations for your Platform (ChatGPT/Gemini API):**\n\n* **API Limits:** Be mindful of token limits (the amount of text the API can process).  For very long documents, you might need to chunk the text and summarize each chunk separately.\n* **System-Level Instructions:**  You can provide system-level instructions to the API to set a general context or persona.  For example, you could tell it to \"act as a helpful and informative assistant.\"\n* **Prompt Engineering Techniques:** Explore advanced techniques like few-shot learning (providing examples in the prompt) and chain-of-thought prompting (encouraging the model to explain its reasoning) to improve results.\n\n\nBy combining these strategies and tailoring your prompts to specific tasks, you can effectively leverage the power of ChatGPT or Gemini to create a versatile and helpful chatbot application. Remember to test and iterate on your prompts to find what works best.\n" },
                ],
              },
            ],
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
