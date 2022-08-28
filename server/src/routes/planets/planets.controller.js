// importing the model
const { getAllPlanets } = require('../../models/planets.model');

// functions
function httpGetAllPlanets(req, res) {
  return res.status(200).json(getAllPlanets());
}

// exporting
module.exports = {
  httpGetAllPlanets,
};
