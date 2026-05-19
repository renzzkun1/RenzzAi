const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const GROQ_API_KEY = "gsk_xxxx_isi_api_key_lu"; // Ganti ini!

app.get('/', (req, res) => {
    res.send('<h1>Renz3lb v20 API is Online!</h1>');
});

app.post('/chat', async (req, res) => {
    const { apiKey, prompt } = req.body;
    if (apiKey !== "renz3lb-secret-key-2026") return res.status(401).send("Akses ditolak");
    
    try {
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama3-8b-8192",
            messages: [{ role: "user", content: prompt }]
        }, { headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` } });
        res.json({ reply: response.data.choices[0].message.content });
    } catch (e) {
        res.status(500).json({ error: "Gagal ke Groq" });
    }
});

app.listen(2014, () => console.log("Renz3lb Ready"));