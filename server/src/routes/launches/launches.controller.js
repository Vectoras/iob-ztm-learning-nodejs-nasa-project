// importing the model
const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require('../../models/launches.model');

// importing services functions
const { getPagination } = require('../../services/query');

// functions
function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

function httpAddNewLaunch(req, res) {
  // extracting data
  const launch = req.body;

  // data validation - missing fields
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  // data validation - not recognized date format
  launch.launchDate = new Date(launch.launchDate);
  // if (launch.launchDate.toString() === 'Inavalid Date') {
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  // busines logic - add the launch
  addNewLaunch(launch);

  // respond with success code
  return res.status(201).json(launch);
}

function httpAbortLaunchById(req, res) {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: `Launch not found`,
    });
  }

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

// exporting
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunchById,
};
