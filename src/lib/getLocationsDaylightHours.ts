import Bluebird from 'bluebird';
import fetch from 'node-fetch';

import { generateLocations } from './locations';
import { Location, LocationDaylightData } from '../types/locations';

async function getDataFromAPI(location: Location) {
  const { lat, lng } = location;
  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`;

  return await fetch(url, {
    method: 'GET'
  }).then((response) => {
    return response.json();
  });
}

async function getLocationData(location: Location) {
  const { lat, lng } = location;
  const locationData: LocationDaylightData = await getDataFromAPI(location);

  locationData['coords'] = { lat, lng };

  return locationData;
}

export async function getLocationsDaylightHours() {
  const locations: Location[] = generateLocations();

  const locationsDaylightHours = Bluebird.map(
    locations,
    (location) => {
      return getLocationData(location);
    },
    { concurrency: 5 }
  )
    .then((locationsData) => {
      return locationsData;
    })
    .catch((err) => {
      console.log('Error:', err.message);
    });

  return locationsDaylightHours;
}
