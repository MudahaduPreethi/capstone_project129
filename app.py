from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load the pre-trained model
model = pickle.load(open('crop_recommendation_model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    location = data['location']
    soil_moisture = float(data['soil_moisture'])
    soil_ph = float(data['soil_ph'])

    # For simplicity, let's ignore 'location' and use soil data for prediction
    prediction = model.predict([[soil_moisture, soil_ph]])[0]

    return jsonify({
        'recommended_crop': prediction
    })

if __name__ == '__main__':
    app.run(debug=True)
