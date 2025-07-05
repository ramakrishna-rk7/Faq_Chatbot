
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(bodyParser.json());

const faqData = [
  { question: "What are the college admission dates?", answer: "Admissions open from June 1 to July 15." },
  { question: "How do I reset my password?", answer: "Click on 'Forgot Password' on the login page." }
];

app.post('/chat', async (req, res) => {
  const userMsg = req.body.message;

  const prompt = `
You are a helpful chatbot trained on the following FAQs:

${faqData.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n")}

User question: ${userMsg}
Answer only if the question is related. Otherwise, say "Sorry, I can't help with that."
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: "user", content: prompt }],
    max_tokens: 100,
  });

  const reply = completion.choices[0].message.content;
  res.json({ reply });
});

app.listen(5000, () => console.log('Chatbot server running on port 5000'));
