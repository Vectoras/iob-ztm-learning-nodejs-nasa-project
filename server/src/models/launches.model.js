// importing npm modules
const axios = require('axios');

// data

const launches = new Map();

let latestFlightNumber = 0;

// const launch = {
//   flightNumber: latestFlightNumber, // flight_number
//   mission: 'Kepler Exploration X', // name
//   rocket: 'Explorer IS2', // rocket.name
//   launchDate: new Date('27/12/2030'), // date_local
//   target: 'Kepler-442 b', // N/A
//   customers: ['ZTM', 'NASA'], // payload.customers for each payload
//   upcoming: true, // upcoming
//   success: true, // success
// };

// launches.set(launch.flightNumber, launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

// functions
async function loadLaunchData() {
  console.log('Downloading launch data ...');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log('Problem downloading launch data');
    throw new Error('Launch data download failed');
  }

  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    });

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    };

    launches.set(launch.flightNumber, launch);
  }
}

function getAllLaunches(skip, limit) {
  const start = skip;
  const end = limit ? skip + limit : undefined;

  return Array.from(launches.values())
    .sort((a, b) => a.flightNumber - b.flightNumber)
    .slice(start, end);
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Zero to Mastery', 'NASA'],
      flightNumber: latestFlightNumber,
    })
  );
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

// exporting
module.exports = {
  loadLaunchData,
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
