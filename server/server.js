const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/predict', async (req, res) => {
  try {
    // Forward req to the Python API 
    const response = await axios.post('http://localhost:5000/predict', req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error in /api/predict:", error);
    res.status(500).send("Prediction error");
  }
});


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
