const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const path = require('path');

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Path to the Python script
const scriptPath = path.resolve(__dirname, 'predict.py');

// Define the route for prediction
app.post('/predict', (req, res) => {
    const inputData = req.body.features;

    if (!Array.isArray(inputData)) {
        return res.status(400).json({ error: 'Invalid input format' });
    }

    const options = {
        mode: 'json',
        pythonPath: 'python', // Adjust this if needed for the correct Python environment
        scriptPath: path.dirname(scriptPath),
        args: [JSON.stringify({ features: inputData })] // Pass input as JSON string
    };

    PythonShell.run(path.basename(scriptPath), options)
        .then(results => {
            if (results && results.length > 0) {
                const result = results[0];
                if (result.error) {
                    throw new Error(result.error);
                }
                res.json(result);
            } else {
                res.status(500).json({ error: 'No result from Python script' });
            }
        })
        .catch(err => {
            console.error('Python Error:', err);
            res.status(500).json({ error: 'An error occurred while processing the request', details: err.message });
        });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Node.js server running at http://localhost:${port}`);
});
