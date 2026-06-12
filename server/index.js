const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// -------------------------
// Middleware
// -------------------------
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
  })
);

app.use(express.json());

// -------------------------
// Routes
// -------------------------
const analyseRoute = require('./routes/analyse');
const uploadRoute = require('./routes/upload');
const resumeRoute = require('./routes/resume');

app.use('/api', analyseRoute);
app.use('/api', uploadRoute);
app.use('/api/resume', resumeRoute);

// -------------------------
// MongoDB Connection
// -------------------------
console.log('Mongo URI loaded:', !!process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:');
    console.error(err.message);
  });

// -------------------------
// Health Check Route
// -------------------------
app.get('/', (req, res) => {
  res.send('VitaeX backend running ✅');
});

// -------------------------
// Start Server
// -------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});