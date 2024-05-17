import { Coordinates } from '../types';

export function makeCoordinates(location: google.maps.LatLng): Coordinates {
    return {
        lat: location.lat(),
        lng: location.lng(),
    };
}
