// importing npm modules
const express = require('express');

// importing the routers used by this api version
const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

// creating the api router
const api = express.Router();

// adding the routers
api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);

//exporting
module.exports = api;
