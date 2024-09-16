from flask import Flask, request, jsonify # type: ignore
import pickle
import numpy as np # type: ignore

app = Flask(__name__)

# Load the model once
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features).tolist()
    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(port=5001)  # Ensure it's a different port from your Node.js server
