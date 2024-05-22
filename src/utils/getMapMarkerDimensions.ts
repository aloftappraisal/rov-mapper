import { MARKER_SVG_VIEWBOX_DIMENSIONS } from '../consts';
import { MapMarkerSize } from '../types';

const sizeToDimensions: Record<MapMarkerSize, { width: string; height: string }> = {
    sm: MARKER_SVG_VIEWBOX_DIMENSIONS,
    md: {
        width: '26',
        height: '33',
    },
};

export function getMapMarkerDimensions(size: MapMarkerSize): {
    width: string;
    height: string;
} {
    return sizeToDimensions[size];
}
