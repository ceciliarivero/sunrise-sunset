import Bluebird from 'bluebird';
import fetch from 'node-fetch';

import { generateLocations } from './locations';
import { Location, LocationDaylightData } from '../types/locations';

export async function getLocationsDaylightHours() {
  const locations: Location[] = generateLocations();

  const locationsDaylightHours = Bluebird.map(
    locations,
    async (location) => {
      const { lat, lng } = location;
      const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`;

      return fetch(url, { method: 'GET' }).then((response) => {
        return response.json();
      });
    },
    { concurrency: 5 }
  )
    .then((result: LocationDaylightData[]) => {
      return result;
    })
    .catch((err) => {
      console.log('Error:', err.message);
    });

  return locationsDaylightHours;
}
