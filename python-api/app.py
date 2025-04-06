from flask import Flask, request, jsonify
import numpy as np
import pickle
import pandas as pd
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
with open("svc.pkl", "rb") as f:
    svc = pickle.load(f)


with open("symptoms_dict.json", "r") as f:
    symptoms_dict = json.load(f)

with open("diseases_list.json", "r") as f:
    diseases_list = json.load(f)


description = pd.read_csv("data/description.csv")
precautions = pd.read_csv("data/precautions_df.csv")
medications = pd.read_csv("data/medications.csv")
diets = pd.read_csv("data/diets.csv")
workout = pd.read_csv("data/workout_df.csv")

def helper(dis):
    desc_arr = description[description['Disease'] == dis]['Description'].values
    desc = desc_arr[0] if len(desc_arr) > 0 else "No description available."
    
    
    pre_df = precautions[precautions['Disease'] == dis]
    pre = pre_df[['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']].values.tolist()[0] if not pre_df.empty else []

    
    med = medications[medications['Disease'] == dis]['Medication'].values.tolist() if not medications[medications['Disease'] == dis].empty else []
    die = diets[diets['Disease'] == dis]['Diet'].values.tolist() if not diets[diets['Disease'] == dis].empty else []
    wrkout = workout[workout['disease'] == dis]['workout'].values.tolist() if not workout[workout['disease'] == dis].empty else []
    
    return desc, pre, med, die, wrkout

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get('symptoms', [])

    
    input_vector = np.zeros(len(symptoms_dict))
    for symptom in symptoms:
        if symptom in symptoms_dict:
            input_vector[symptoms_dict[symptom]] = 1

    
    predicted_index = svc.predict([input_vector])[0]
    predicted_disease = predicted_index 

    
    desc, pre, med, die, wrkout = helper(predicted_disease)

    return jsonify({
        "predicted_disease": predicted_disease,
        "description": desc,
        "precautions": pre,
        "medications": med,
        "diets": die,
        "workout": wrkout
    })

if __name__ == '__main__':
    app.run(debug=True)
