// importing npm modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

console.log(__dirname);

// creating the app
const app = express();

// importing api routers
const api_v1 = require('./routes/v1.api');

// middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// using routes
app.use('/v1', api_v1);
app.use('/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

// exports
module.exports = app;
