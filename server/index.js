const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const analyseRoute = require('./routes/analyse');
app.use('/api', analyseRoute);

const uploadRoute = require('./routes/upload');
app.use('/api', uploadRoute);

// MongoDB - optional, won't crash if it fails
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('⚠️ MongoDB not connected, running without DB'));

// Health check
app.get('/', (req, res) => res.send('VitaeX backend running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));