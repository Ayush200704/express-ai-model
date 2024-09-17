import sys
import json
import pickle
import numpy as np

# Load the model once
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

def predict(input_data):
    # Convert input data to numpy array and reshape
    features = np.array(input_data).reshape(1, -1)
    
    # Make prediction
    prediction = model.predict(features).tolist()
    
    return prediction

if __name__ == "__main__":
    try:
        # Read input from command line argument
        input_json = sys.argv[1]
        input_data = json.loads(input_json)['features']
        
        # Perform prediction
        results = predict(input_data)
        
        # Print the results as JSON to stdout
        print(json.dumps({"prediction": results}))
    
    except Exception as e:
        # If there were any errors, print them as JSON to stdout
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
