// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  X,
  Search,
  AlertCircle,
  CheckCircle,
  Shield,
  Pill,
  Utensils,
  Activity,
  Info,
} from "lucide-react";

function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  // Fetch all available symptoms when component mounts
  useEffect(() => {
    // Here we hardcode symptoms from your model
    // In production, you might want to fetch this from your backend
    const allSymptoms = [
      "itching",
      "skin_rash",
      "nodal_skin_eruptions",
      "continuous_sneezing",
      "shivering",
      "chills",
      "joint_pain",
      "stomach_pain",
      "acidity",
      "ulcers_on_tongue",
      "muscle_wasting",
      "vomiting",
      "burning_micturition",
      "spotting_urination",
      "fatigue",
      "weight_gain",
      "anxiety",
      "cold_hands_and_feets",
      "mood_swings",
      "weight_loss",
      "restlessness",
      "lethargy",
      "patches_in_throat",
      "irregular_sugar_level",
      "cough",
      "high_fever",
      "sunken_eyes",
      "breathlessness",
      "sweating",
      "dehydration",
      "indigestion",
      "headache",
      "yellowish_skin",
      "dark_urine",
      "nausea",
      "loss_of_appetite",
      "pain_behind_the_eyes",
      "back_pain",
      "constipation",
      "abdominal_pain",
      "diarrhoea",
      "mild_fever",
      "yellow_urine",
      "yellowing_of_eyes",
      "acute_liver_failure",
      "fluid_overload",
      "swelling_of_stomach",
      "swelled_lymph_nodes",
      "malaise",
      "blurred_and_distorted_vision",
      "phlegm",
      "throat_irritation",
      "redness_of_eyes",
      "sinus_pressure",
      "runny_nose",
      "congestion",
      "chest_pain",
      "weakness_in_limbs",
      "fast_heart_rate",
      "pain_during_bowel_movements",
      "pain_in_anal_region",
      "bloody_stool",
      "irritation_in_anus",
      "neck_pain",
      "dizziness",
      "cramps",
      "bruising",
      "obesity",
      "swollen_legs",
      "swollen_blood_vessels",
      "puffy_face_and_eyes",
      "enlarged_thyroid",
      "brittle_nails",
      "swollen_extremeties",
      "excessive_hunger",
      "extra_marital_contacts",
      "drying_and_tingling_lips",
      "slurred_speech",
      "knee_pain",
      "hip_joint_pain",
      "muscle_weakness",
      "stiff_neck",
      "swelling_joints",
      "movement_stiffness",
      "spinning_movements",
      "loss_of_balance",
      "unsteadiness",
      "weakness_of_one_body_side",
      "loss_of_smell",
      "bladder_discomfort",
      "foul_smell_of_urine",
      "continuous_feel_of_urine",
      "passage_of_gases",
      "internal_itching",
      "toxic_look_(typhos)",
      "depression",
      "irritability",
      "muscle_pain",
      "altered_sensorium",
      "red_spots_over_body",
      "belly_pain",
      "abnormal_menstruation",
      "dischromic_patches",
      "watering_from_eyes",
      "increased_appetite",
      "polyuria",
      "family_history",
      "mucoid_sputum",
      "rusty_sputum",
      "lack_of_concentration",
      "visual_disturbances",
      "receiving_blood_transfusion",
      "receiving_unsterile_injections",
      "coma",
      "stomach_bleeding",
      "distention_of_abdomen",
      "history_of_alcohol_consumption",
      "fluid_overload",
      "blood_in_sputum",
      "prominent_veins_on_calf",
      "palpitations",
      "painful_walking",
      "pus_filled_pimples",
      "blackheads",
      "scurring",
      "skin_peeling",
      "silver_like_dusting",
      "small_dents_in_nails",
      "inflammatory_nails",
      "blister",
      "red_sore_around_nose",
      "yellow_crust_ooze",
    ];

    setSymptoms(allSymptoms);
  }, []);

  const filteredSymptoms = symptoms.filter(
    (symptom) =>
      symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSymptoms.includes(symptom)
  );

  const handleAddSymptom = (symptom) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleRemoveSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        symptoms: selectedSymptoms,
      });

      setPrediction(response.data);
      setActiveTab("description");

      // Scroll to results section smoothly
      const resultsSection = document.getElementById("results-section");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      setError("Failed to get prediction. Please try again.");
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedSymptoms([]);
    setPrediction(null);
    setError(null);
  };

  const tabIcons = {
    description: <Info size={20} />,
    precautions: <Shield size={20} />,
    medications: <Pill size={20} />,
    diets: <Utensils size={20} />,
    workout: <Activity size={20} />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">MediAssist</h1>
          <p className="text-lg text-blue-600">
            Advanced Symptom Analysis & Medical Recommendations
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                What symptoms are you experiencing?
              </h2>

              <div className="relative mb-4">
                <div className="flex items-center border-2 rounded-lg border-blue-200 focus-within:border-blue-500 bg-white">
                  <Search className="ml-3 text-blue-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search and select symptoms..."
                    className="w-full p-3 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mr-3 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {showDropdown && filteredSymptoms.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                    {filteredSymptoms.slice(0, 8).map((symptom) => (
                      <div
                        key={symptom}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 flex items-center"
                        onClick={() => handleAddSymptom(symptom)}
                      >
                        <span className="flex-grow capitalize">
                          {symptom.replace(/_/g, " ")}
                        </span>
                        <span className="text-blue-500 text-sm">Add</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Selected Symptoms:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.length === 0 ? (
                    <span className="text-gray-400 italic">
                      No symptoms selected
                    </span>
                  ) : (
                    selectedSymptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm"
                      >
                        <span className="capitalize">
                          {symptom.replace(/_/g, " ")}
                        </span>
                        <button
                          onClick={() => handleRemoveSymptom(symptom)}
                          className="ml-2 hover:text-blue-600"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={resetForm}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition"
                >
                  Reset
                </button>
                <button
                  onClick={handlePredict}
                  disabled={loading || selectedSymptoms.length === 0}
                  className={`px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition flex items-center ${
                    loading || selectedSymptoms.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loading ? "Analyzing..." : "Analyze Symptoms"}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle
                    className="text-red-500 mr-2 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <span className="text-red-600">{error}</span>
                </div>
              )}
            </div>
          </div>

          
          {prediction && (
            <div id="results-section" className="mb-10 animate-fadeIn">
              <div className="flex justify-center mb-6">
                <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-2">
                  Diagnosis Results
                </h2>
                <p className="text-blue-600">
                  Based on your symptoms, our AI system has analyzed the
                  following
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl shadow-2xl overflow-hidden text-white">
                <div className="p-8 text-center">
                  <div className="inline-block p-3  bg-opacity-20 rounded-full  ">
                    <CheckCircle size={50} className="text-white" />
                  </div>
                  <h2 className="text-4xl p-3 font-bold mb-2 capitalize">
                    {prediction.predicted_disease.replace(/_/g, " ")}
                  </h2>
                  <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 inline-flex items-center text-black ">
                    <span>Analysis Complete</span>
                  </div>
                </div>

                
                <div className="flex bg-blue-900 bg-opacity-50">
                  {[
                    "description",
                    "precautions",
                    "medications",
                    "diets",
                    "workout",
                  ].map((tab) => (
                    <button
                      key={tab}
                      className={`flex-1 px-4 py-3 flex items-center justify-center space-x-2 transition-colors ${
                        activeTab === tab
                          ? "bg-white text-blue-800 font-semibold"
                          : "text-blue-100 hover:bg-blue-800"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tabIcons[tab]}
                      <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                    </button>
                  ))}
                </div>

                
                <div className="bg-white p-6">
                  {activeTab === "description" && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-4">
                        <Info size={24} className="text-blue-600 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-800">
                          About the Condition
                        </h3>
                      </div>
                      <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-700 leading-relaxed">
                          {prediction.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "precautions" && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-4">
                        <Shield size={24} className="text-green-600 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-800">
                          Recommended Precautions
                        </h3>
                      </div>
                      {prediction.precautions &&
                      prediction.precautions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {prediction.precautions.map(
                            (precaution, index) =>
                              precaution && (
                                <div
                                  key={index}
                                  className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500"
                                >
                                  <div className="flex items-start">
                                    <div className="bg-green-100 text-green-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                      {index + 1}
                                    </div>
                                    <p className="text-gray-700">
                                      {precaution}
                                    </p>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No specific precautions available.
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "medications" && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-4">
                        <Pill size={24} className="text-purple-600 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-800">
                          Possible Medications
                        </h3>
                      </div>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <p className="text-yellow-700">
                          <strong>Important:</strong> This information is for
                          reference only. Please consult with a healthcare
                          professional before taking any medication.
                        </p>
                      </div>
                      {prediction.medications &&
                      prediction.medications.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {prediction.medications.map((medication, index) => (
                            <div
                              key={index}
                              className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500 flex items-center"
                            >
                              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                                <Pill size={20} className="text-purple-600" />
                              </div>
                              <p className="text-gray-700">{medication}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No specific medications available.
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "diets" && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-4">
                        <Utensils size={24} className="text-orange-600 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-800">
                          Dietary Recommendations
                        </h3>
                      </div>
                      {prediction.diets && prediction.diets.length > 0 ? (
                        <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                          <ul className="space-y-4">
                            {prediction.diets.map((diet, index) => (
                              <li key={index} className="flex items-start">
                                <div className="bg-orange-200 text-orange-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <p className="text-gray-700">{diet}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No specific dietary recommendations available.
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "workout" && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-4">
                        <Activity size={24} className="text-blue-600 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-800">
                          Exercise Recommendations
                        </h3>
                      </div>
                      {prediction.workout && prediction.workout.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {prediction.workout.map((workout, index) => (
                            <div
                              key={index}
                              className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500"
                            >
                              <div className="flex items-start">
                                <div className="bg-blue-200 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <p className="text-gray-700">{workout}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No specific exercise recommendations available.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-blue-900 bg-opacity-50 text-center">
                  <button
                    onClick={resetForm}
                    className="text-white underline hover:text-blue-200"
                  >
                    Start a New Analysis
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>
              This tool is for informational purposes only and does not
              substitute professional medical advice.
            </p>
            <p>
              Always consult with a healthcare professional regarding medical
              conditions and treatments.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
