import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { GoogleMapsAutocompleteInput } from './components/GoogleMapsAutocompleteInput';
import { ComparableProperty, SubjectProperty } from './types';
import { makeAddress } from './utils/makeAddress';
import { makeCoordinates } from './utils/makeCoordinates';

// TODO: Handle duplicate addresses

function App() {
    const [isDebugModeOn, setIsDebugModeOn] = useState(false);

    const [instructions, setInstructions] = useState<string>();
    const [subject, setSubject] = useState<SubjectProperty | null>(null);

    const [appraisalComps, setAppraisalComps] = useState<ComparableProperty[]>([]);
    const [rovComps, setROVComps] = useState<ComparableProperty[]>([]);

    return (
        <div className="max-w-[1500px] py-4 px-6 mx-auto flex flex-col gap-8 min-h-full">
            <h1 className="text-3xl font-bold text-center">ROV Comparables Tool</h1>
            <div className="flex gap-8 flex-col lg:flex-row flex-1">
                <div className="basis-[500px] flex flex-col gap-4 self-center lg:self-start">
                    <div>
                        <button
                            onClick={() => setIsDebugModeOn((x) => !x)}
                            className="border border-gray-500 rounded px-2 py-1"
                        >
                            Turn {isDebugModeOn ? 'off' : 'on'} debug mode
                        </button>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="instructions">Instructions</label>
                        </div>
                        <textarea
                            id="instructions"
                            className="w-full h-12 border border-gray-500 rounded px-2 py-1"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="subject">Subject property adress</label>
                        </div>
                        <GoogleMapsAutocompleteInput
                            className="w-full border border-gray-500 rounded px-2 py-1"
                            onPlaceChange={(place) => {
                                if (!place?.geometry?.location) return;
                                if (!place?.address_components?.length) return;

                                const address = makeAddress(place.address_components);
                                const location = makeCoordinates(place.geometry.location);

                                setSubject({
                                    address,
                                    location,
                                });
                            }}
                            onBlur={(p) => {
                                if (p === null) setSubject(null);
                            }}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div>
                                <label htmlFor="appraisal-comps">Add Appraisal Comp</label>
                            </div>
                            <GoogleMapsAutocompleteInput
                                className="w-full border border-gray-500 rounded px-2 py-1"
                                clearOnPlaceChange
                                onPlaceChange={(place) => {
                                    if (!place?.geometry?.location) return;
                                    if (!place?.address_components?.length) return;

                                    const address = makeAddress(place.address_components);
                                    const location = makeCoordinates(place.geometry.location);

                                    setAppraisalComps((prev) => [
                                        ...prev,
                                        {
                                            address,
                                            location,
                                            proximity: 0, // TODO: Calculate proximity
                                        },
                                    ]);
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <div>
                                <label htmlFor="appraisal-comps">Add an ROV Sale</label>
                            </div>
                            <GoogleMapsAutocompleteInput
                                className="w-full border border-gray-500 rounded px-2 py-1"
                                clearOnPlaceChange
                                onPlaceChange={(place) => {
                                    if (!place?.geometry?.location) return;
                                    if (!place?.address_components?.length) return;

                                    const address = makeAddress(place.address_components);
                                    const location = makeCoordinates(place.geometry.location);

                                    setROVComps((prev) => [
                                        ...prev,
                                        {
                                            address,
                                            location,
                                            proximity: 0, // TODO: Calculate proximity
                                        },
                                    ]);
                                }}
                            />
                        </div>
                    </div>
                    {isDebugModeOn && (
                        <div className="max-h-96 overflow-auto">
                            <pre>
                                {JSON.stringify(
                                    {
                                        instructions,
                                        subject,
                                        appraisalComps,
                                        rovComps,
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                        </div>
                    )}
                </div>
                <APIProvider apiKey={'AIzaSyDMft9zkCHh_o2BtOh8-_8tPstDgTSb5b0'}>
                    <div className="flex-grow w-full lg:w-auto h-[500px]">
                        {subject ? (
                            <Map
                                defaultCenter={subject.location}
                                defaultZoom={12}
                                streetViewControl={false}
                                mapId={'satellite'}
                                gestureHandling={'greedy'}
                            >
                                <Marker position={subject.location} />
                                {appraisalComps.length
                                    ? appraisalComps.map((c) => <Marker position={c.location} />)
                                    : null}
                                {(!!appraisalComps.length || !!rovComps.length) && (
                                    <BoundsHandler
                                        subject={subject}
                                        appraisalComps={appraisalComps}
                                    />
                                )}
                            </Map>
                        ) : (
                            <div className="bg-gray-300 flex justify-center items-center h-full w-full">
                                <p>Enter a subject address to view map</p>
                            </div>
                        )}
                    </div>
                </APIProvider>
            </div>
        </div>
    );
}

function BoundsHandler({
    subject,
    appraisalComps,
}: {
    subject: SubjectProperty;
    appraisalComps: ComparableProperty[];
}) {
    const map = useMap();

    useEffect(() => {
        if (!map || !subject) return;

        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(subject?.location);
        appraisalComps.forEach((marker) => {
            bounds.extend(marker.location);
        });

        map.fitBounds(bounds);

        if (subject && !appraisalComps.length) {
            map.setZoom(12);
        }
    }, [appraisalComps, map, subject]);

    return null;
}

export default App;
