import Bluebird from 'bluebird';
import fetch from 'node-fetch';

import { generateLocations } from './locations';
import { Location, LocationDaylightData } from '../types/locations';

async function getDataFromAPI(location: Location) {
  const { lat, lng } = location;
  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`;

  return await fetch(url, { method: 'GET' });
}

async function getLocationData(location: Location) {
  const { lat, lng } = location;
  const locationDataFromAPI = await getDataFromAPI(location);
  const locationData: LocationDaylightData = await locationDataFromAPI.json();

  locationData['coords'] = { lat, lng };

  return locationData;
}

export async function getLocationsDaylightHours() {
  const locations: Location[] = generateLocations();

  try {
    return Bluebird.map(
      locations,
      (location) => {
        return getLocationData(location);
      },
      { concurrency: 5 }
    );
  } catch (err) {
    console.log('Error:', err.message);
  }
}
