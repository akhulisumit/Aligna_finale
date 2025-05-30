# 🤖 PDF-Based AI Chatbot Builder for Startups

A no-code platform that lets startups upload a PDF with their business or product information and instantly get an embeddable AI chatbot trained on that content.

---

## 🚀 Features

- 📄 Upload a PDF with your company details  
- 🧠 Automatically trains a chatbot using your content  
- 💬 Chatbot answers user questions based only on the uploaded PDF  
- 🔗 One-click embed with a simple `<script>` tag  
- 🖥️ Works on any website, no coding required  

---

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js (Express) or Python (FastAPI)  
- **PDF Parsing**: PyMuPDF / pdfminer  
- **Embeddings**: OpenAI or HuggingFace models  
- **Vector DB**: Chroma / Pinecone / Weaviate  
- **LLM**: GPT-4 / Mistral / Claude  
- **Authentication**: Supabase / Firebase  

---

## 📦 How It Works

1. **Upload PDF**  
   → Extracts and chunks text from the file

2. **Vector Embedding**  
   → Converts chunks to embeddings and stores in a vector database

3. **User Query**  
   → Embeds query → retrieves relevant chunks → sends to LLM

4. **Response**  
   → The LLM generates a context-aware response using only your PDF data

5. **Embed Script**  
   → Each bot gets a unique `<script>` tag to embed the chatbot on any site

---
