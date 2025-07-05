
# GPT-Powered FAQ Chatbot

## Overview
A simple FAQ chatbot powered by OpenAI GPT. It answers user queries based on predefined FAQs.

## Setup

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install express cors body-parser openai dotenv
node server.js
```

Set your OpenAI API key in `backend/.env`.

## Usage
Open the frontend and chat! The backend uses GPT to return answers based on the FAQ data.
