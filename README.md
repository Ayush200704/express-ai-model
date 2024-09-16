# AI Model Integration with Express.js Backend

This project demonstrates the integration of a machine learning model with an Express.js backend. It uses a Python script for prediction and a Node.js server to expose the model via an API.

## Prerequisites

- Python 3.7+
- Node.js 14+
- npm (usually comes with Node.js)

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/Ayush200704/express-ai-model.git
   cd express-ai-model
   ```

2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Install Node.js dependencies:
   ```
   npm install
   ```

## Running the Application

### 1. Python Prediction Script

First, run the Python script to ensure the model is working correctly:

```
python predict.py
```

This script should load the model and be ready to make predictions.

### 2. Express.js Server

Next, start the Express.js server:

```
npm run dev
```

The server should start and you'll see a message like "Server running on port 3000".

## Testing the API

You can test the API using Postman or any HTTP client. Here's how to do it with Postman:

1. Open Postman
2. Create a new POST request
3. Set the URL to `http://localhost:5000/predict` 
4. Set the request body to raw JSON and input the following:

```json
{
  "features": [5.1, 3.5, 1.4, 0.2]
}
```

5. Send the request

You should receive a response with the model's prediction.

## API Endpoint

- **URL**: `/predict`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "features": [number, number, number, number]
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "prediction": "predicted_class" }`

