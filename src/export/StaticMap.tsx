import { Image } from '@react-pdf/renderer';
import { ExportProps } from './types';
import { Coordinates } from '../types';

type Props = {
    subject: ExportProps['subject'];
    appraisalComps: ExportProps['appraisalComps'];
    rovComps: ExportProps['rovComps'];
    apiKey: ExportProps['apiKey'];
};

export function StaticMap({ subject, appraisalComps, rovComps, apiKey }: Props) {
    const params = new URLSearchParams({
        size: '535x627', // NOTE: This needs to get updated if the layout of the first page changes
        maptype: 'satellite',
        key: apiKey,
    });

    const subjectMarker = makeMarkerString(subject.location, 'red', 'S');
    const appraisalCompsMarkers = appraisalComps.map((comp, i) =>
        makeMarkerString(comp.location, 'blue', i)
    );
    const rovCompsMarkers = rovComps.map((comp, i) => makeMarkerString(comp.location, 'green', i));

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
