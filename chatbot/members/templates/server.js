const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Read the API key from config.json
const config = JSON.parse(fs.readFileSync('api_key.json', 'utf8'));

// Create an endpoint to send the API key
app.get('/get-api-key', (req, res) => {
    res.json({ apiKey: config.apiKey });
});

// Serve static files (like your frontend)
app.use(express.static('public'));