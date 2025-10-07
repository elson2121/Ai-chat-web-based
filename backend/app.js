// Add "type": "module" to your package.json to use import/export syntax
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config();
console.log("Key loaded (first 5 chars):", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 5) : "Key not found");


// ...

const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
  apiKey: process.env.GEMINI_API_KEY, 
   baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); // Parses JSON body from the React app
// ... (imports and middleware are fine)

// 🧠 AI Chat Endpoint - Make sure this is UNCOMMENTED
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    // 1. Send the user's prompt to the configured Gemini model
    const completion = await openai.chat.completions.create({
      // Use the Gemini model name
      model: 'gemini-2.5-flash', 
      messages: [
        { role: 'system', content: 'You are a minimalist but helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    // 2. Send the AI's response back to the frontend
    res.json({ 
      message: completion.choices[0].message.content.trim() 
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

// 🚀 Start Server - Make sure this is UNCOMMENTED
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Remove the standalone callGemini() function and its call.