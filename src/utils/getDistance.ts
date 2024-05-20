import { Coordinates } from '../types';
import { point, distance as turfDistance } from '@turf/turf';

export function getDistance(start: Coordinates, end: Coordinates) {
    const from = point([start.lng, start.lat]);
    const to = point([end.lng, end.lat]);
    return turfDistance(from, to, { units: 'miles' });
}
