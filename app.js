const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('✅ Task API is running');
});

module.exports = app;
