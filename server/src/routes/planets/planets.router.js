// importing npm modules
const express = require('express');

// importing the controller
const { httpGetAllPlanets } = require('./planets.controller');

// creating the router
const planetsRouter = express.Router();

// --- get -----------

planetsRouter.get('/', httpGetAllPlanets);

// --- post ----------

// export
module.exports = planetsRouter;
