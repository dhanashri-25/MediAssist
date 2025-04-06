# MediAssist - Symptom Analysis & Medical Recommendations


MediAssist is an advanced web application that uses machine learning to analyze user-input symptoms and provide potential medical diagnoses along with comprehensive recommendations for treatment, precautions, dietary advice, and exercise routines.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Model Training](#model-training)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Disclaimer](#disclaimer)

## 🔍 Overview

MediAssist serves as a preliminary diagnostic tool that helps users understand potential health conditions based on their symptoms. The application analyzes user-selected symptoms against a trained machine learning model to predict possible medical conditions and provide comprehensive information including:

- Detailed description of the condition
- Recommended precautions
- Potential medications
- Dietary recommendations
- Exercise suggestions

**Note:** MediAssist is designed for informational purposes only and does not replace professional medical advice.

## ✨ Features

- **Intuitive Symptom Selection:** Easy-to-use interface with search functionality for selecting symptoms
- **Real-time Analysis:** Instant processing and prediction using machine learning
- **Comprehensive Information:** Detailed information about potential conditions
- **Responsive Design:** Modern UI that works across devices
- **Treatment Recommendations:** Organized into clear categories for ease of understanding

## 💻 Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Lucide React (for icons)
- Axios (for API requests)

### Backend
- Flask (Python)
- Express.js (Node.js)
- scikit-learn (for ML model)
- Pandas & NumPy

### Machine Learning
- Support Vector Classification (SVC)
- Trained on a dataset of symptoms and corresponding diseases

## 📁 Project Structure

```
MediAssist/
├── data/                    # Dataset files
│   ├── description.csv
│   ├── diets.csv
│   ├── medications.csv
│   ├── precautions_df.csv
│   └── workout_df.csv
├── public/                  # Static assets
├── src/                     # React frontend source code
│   ├── App.js               # Main application component
│   └── ...
├── app.py                   # Flask API endpoints
├── diseases_list.json       # Disease mapping
├── package.json             # Node.js dependencies
├── requirements.txt         # Python dependencies
├── server.js                # Express.js server
├── svc.pkl                  # Trained ML model
├── symptoms_dict.json       # Symptom mapping
└── train_model.py           # Model training script
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.7 or higher)
- pip
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhanashri-25/MediAssist.git
   cd MediAssist
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

## 🖥️ Usage

1. **Start the Flask API**
   ```bash
   python app.py
   ```

2. **In a new terminal, start the Express server**
   ```bash
   node server.js
   ```

3. **In a new terminal, start the React application**
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🧠 Model Training

The predictive model is built using Support Vector Classification (SVC) from scikit-learn. The model training process includes:

1. **Data Collection**: The training dataset (`Training.csv`) contains a comprehensive list of symptoms and their corresponding disease labels.

2. **Feature Engineering**: Each symptom is treated as a binary feature (present or absent).

3. **Model Selection**: SVC was chosen for its effectiveness in multi-class classification tasks.

4. **Training Process**:
   ```python
   import pandas as pd
   import numpy as np
   import pickle
   import json
   from sklearn.svm import SVC

   # Load dataset
   df = pd.read_csv("Training.csv")

   # Prepare features and target
   symptom_columns = df.columns[:-1]  # Last column is 'prognosis'
   X = df[symptom_columns]
   y = df['prognosis']

   # Train model
   model = SVC()
   model.fit(X, y)

   # Save model and mappings
   with open("svc.pkl", "wb") as f:
       pickle.dump(model, f)

   symptoms_dict = {symptom: idx for idx, symptom in enumerate(symptom_columns)}
   with open("symptoms_dict.json", "w") as f:
       json.dump(symptoms_dict, f)
   ```

5. **Prediction**: When a user inputs symptoms, they are converted to a binary feature vector and passed to the model for prediction.

## 📡 API Endpoints

### `/predict` (POST)
- **Request Body**: JSON object with a list of symptoms
  ```json
  {
    "symptoms": ["itching", "skin_rash", "high_fever"]
  }
  ```
- **Response**: JSON object with disease prediction and recommendations
  ```json
  {
    "predicted_disease": "disease_name",
    "description": "Description of the disease...",
    "precautions": ["precaution1", "precaution2", "precaution3", "precaution4"],
    "medications": ["medication1", "medication2"],
    "diets": ["diet1", "diet2"],
    "workout": ["workout1", "workout2"]
  }
  ```

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/e9368c76-461c-42c9-9199-fec64f345cc6)
![image](https://github.com/user-attachments/assets/c68882c6-ad3b-4ff4-95c5-f2a8a79ef0f2)
![image](https://github.com/user-attachments/assets/af290365-3674-4e16-bb9e-589db2d83571)


## ⚠️ Disclaimer

MediAssist is intended for informational purposes only and does not provide medical advice. The predictions and recommendations provided by this application should not be considered as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
