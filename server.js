const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const pythonServerUrl = 'http://127.0.0.1:5001/predict'; // Flask server URL

app.use(bodyParser.json());

// Define the route for prediction
app.post('/predict', async (req, res) => {
    try {
        const response = await axios.post(pythonServerUrl, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Flask server:', error);
        res.status(500).json({ error: 'Error calling Flask server' });
    }
});

app.listen(port, () => {
    console.log(`Node.js server running at http://localhost:${port}`);
});
