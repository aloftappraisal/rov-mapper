import { Image } from '@react-pdf/renderer';
import { ExportProps } from './types';
import { Coordinates } from '../types';

type Props = {
    subject: ExportProps['subject'];
    appraisalComps: ExportProps['appraisalComps'];
    rovComps: ExportProps['rovComps'];
    width: string;
    height: string;
    apiKey: ExportProps['apiKey'];
};

export function StaticMap({ subject, appraisalComps, rovComps, width, height, apiKey }: Props) {
    const params = new URLSearchParams({
        size: `${width}x${height}`,
        maptype: 'satellite',
        key: apiKey,
    });

    const subjectMarker = makeMarkerString(subject.location, 'red', 'S');
    const appraisalCompsMarkers = appraisalComps.map((comp, i) =>
        makeMarkerString(comp.location, 'blue', i + 1)
    );
    const rovCompsMarkers = rovComps.map((comp, i) =>
        makeMarkerString(comp.location, 'green', i + 1)
    );

    const markerParamsString = [subjectMarker]
        .concat(appraisalCompsMarkers)
        .concat(rovCompsMarkers)
        .join('&');

    const src = `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}&${markerParamsString}`;

    return <Image src={src} />;
}

function makeCoodinatesString(location: Coordinates): string {
    return `${location.lat},${location.lng}`;
}

// TODO: Use SUI colors once pins are determined (e.g., `0x3455DB`)
function makeMarkerString(
    location: Coordinates,
    color: 'red' | 'green' | 'blue',
    label: string | number
): string {
    const encodedValue = encodeURIComponent(
        `color:${color}|label:${label}|${makeCoodinatesString(location)}`
    );
    return `markers=${encodedValue}`;
}
