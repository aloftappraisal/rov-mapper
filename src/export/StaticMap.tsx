import { Image } from '@react-pdf/renderer';
import { APPRAISAL_MARKER_COLOR, ROV_MARKER_COLOR, SUBJECT_MARKER_COLOR } from '../consts';
import { Coordinates } from '../types';
import { ExportProps } from './types';

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

    const subjectMarker = makeMarkerString(subject.location, SUBJECT_MARKER_COLOR.toHex(), 'S');
    const appraisalCompsMarkers = appraisalComps.map((comp, i) =>
        makeMarkerString(comp.location, APPRAISAL_MARKER_COLOR.toHex(), i + 1)
    );
    const rovCompsMarkers = rovComps.map((comp, i) =>
        makeMarkerString(comp.location, ROV_MARKER_COLOR.toHex(), i + 1)
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

function makeMarkerString(location: Coordinates, color: string, label: string | number): string {
    const encodedValue = encodeURIComponent(
        `color:${color}|label:${label}|${makeCoodinatesString(location)}`
    );
    return `markers=${encodedValue}`;
}
