import {
    APIProvider,
    AdvancedMarker,
    Map as GoogleMap,
    Marker,
    useMap,
} from '@vis.gl/react-google-maps';
import { useEffect } from 'react';
import { SubjectPin } from '../svg/SubjectPin';
import { CompType, Property } from '../types';
import { getCompPinComponent } from '../utils/getCompPinComponent';
import { getMaxComps } from '../utils/getMaxComps';

type Props = {
    apiKey: string;
    subject: Property | null;
    appraisalComps: Property[];
    rovComps: Property[];
};

export function Map({ apiKey, subject, appraisalComps, rovComps }: Props) {
    return (
        <APIProvider apiKey={apiKey}>
            <GoogleMap
                mapId="aloft-rov-comps-tool-map"
                mapTypeId="satellite"
                gestureHandling="greedy"
                streetViewControl={false}
                defaultZoom={4}
                defaultCenter={{
                    lat: 36.205143,
                    lng: -98.4736295,
                }}
            >
                {subject && (
                    <AdvancedMarker position={subject.location}>
                        <SubjectPin />
                    </AdvancedMarker>
                )}
                {getCompMarkers('appraisal', appraisalComps)}
                {getCompMarkers('rov', rovComps)}
                <BoundsHandler
                    subject={subject}
                    appraisalComps={appraisalComps}
                    rovComps={rovComps}
                />
            </GoogleMap>
        </APIProvider>
    );
}

function getCompMarkers(compType: CompType, comps: Property[]): React.ReactNode[] {
    if (!comps.length) return [];

    const markers: React.ReactNode[] = [];

    for (let i = 0; i < comps.length; i += 1) {
        const comp = comps[i];
        const maxComps = getMaxComps(compType);
        if (i >= maxComps) {
            markers.push(<Marker position={comp.location} key={comp.id} />);
            console.warn(
                `Max number of ${compType} comps is ${maxComps}, but received ${maxComps}`,
                'Falling back to regular marker.'
            );
            continue;
        }

        const Pin = getCompPinComponent(compType, i);
        markers.push(
            <AdvancedMarker position={comp.location} key={comp.id}>
                <Pin />
            </AdvancedMarker>
        );
    }

    return markers;
}

function BoundsHandler({
    subject,
    appraisalComps,
    rovComps,
}: {
    subject: Property | null;
    appraisalComps: Property[];
    rovComps: Property[];
}) {
    const map = useMap();

    useEffect(() => {
        if (!map || !subject) return;

        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(subject?.location);
        const all = [subject, ...appraisalComps, ...rovComps];
        all.forEach((prop) => {
            bounds.extend(prop.location);
        });

        map.fitBounds(bounds);

        if (all.length === 1) {
            map.setZoom(12);
            map.setCenter(all[0].location);
        }
    }, [appraisalComps, map, rovComps, subject]);

    return null;
}
