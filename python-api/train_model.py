import pandas as pd
import numpy as np
import pickle
import json
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split


df = pd.read_csv("Training.csv") 
# Get all unique symptoms
symptom_columns = df.columns[:-1]  # Last column-'prognosis'
X = df[symptom_columns]
y = df['prognosis']


model = SVC()
model.fit(X, y)


with open("svc.pkl", "wb") as f:
    pickle.dump(model, f)


symptoms_dict = {symptom: idx for idx, symptom in enumerate(symptom_columns)}
with open("symptoms_dict.json", "w") as f:
    json.dump(symptoms_dict, f)


diseases_list = {idx: label for idx, label in enumerate(y.unique())}
with open("diseases_list.json", "w") as f:
    json.dump(diseases_list, f)

print("✅ Model, symptoms_dict, and diseases_list saved.")
