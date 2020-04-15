import * as R from 'ramda';

import { Location } from '../types/locations';

function generateLocation(): Location {
  const lat: number = Number((Math.random() * 180 - 90).toFixed(7));
  const lng: number = Number((Math.random() * 360 - 180).toFixed(7));

  return { lat, lng };
}

export function generateLocations(): Location[] {
  return R.map(generateLocation, R.range(1, 101));
}
