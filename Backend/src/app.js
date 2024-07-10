// src/app.js
const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const cors = require('cors'); 
const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:8080', 
    methods: ['GET'], 
    allowedHeaders: ['Content-Type', 'X-Requested-With'],
  };

module.exports = app;
