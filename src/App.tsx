import { APIProvider, AdvancedMarker, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { CompList } from './components/CompList';
import { CompListItem } from './components/CompListItem';
import { GoogleMapsAutocompleteInput } from './components/GoogleMapsAutocompleteInput';
import { SubjectPin } from './svg/SubjectPin';
import { ComparableProperty, SubjectProperty } from './types';
import { getCompPinComponent } from './utils/getCompPinComponent';
import { makeAddress } from './utils/makeAddress';
import { makeCoordinates } from './utils/makeCoordinates';
import { v4 as uuid } from 'uuid';
import { FormGroup } from './components/FormGroup';
import { TextArea } from './components/TextArea';

// TODO: Handle duplicate addresses

function App() {
    const [isDebugModeOn, setIsDebugModeOn] = useState(false);

    const [instructions, setInstructions] = useState<string>();
    const [subject, setSubject] = useState<SubjectProperty | null>(null);

    const [appraisalComps, setAppraisalComps] = useState<ComparableProperty[]>([]);
    const [rovComps, setROVComps] = useState<ComparableProperty[]>([]);

    const [comments, setComments] = useState<string>();

    return (
        <div className="max-w-[1500px] py-4 px-6 mx-auto flex flex-col gap-8 min-h-full">
            <h1 className="text-3xl font-bold text-center">ROV Comparables Tool</h1>
            <div className="flex gap-8 flex-col lg:flex-row flex-1">
                <div className="lg:basis-[500px] flex flex-col gap-4 self-center lg:self-start">
                    <div>
                        <button
                            onClick={() => setIsDebugModeOn((x) => !x)}
                            className="border border-gray-500 rounded px-2 py-1"
                        >
                            Turn {isDebugModeOn ? 'off' : 'on'} debug mode
                        </button>
                    </div>
                    <FormGroup for="instructions" label="Instructions">
                        <TextArea
                            id="instructions"
                            className="h-16"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup for="subject" label="Subject property address">
                        <GoogleMapsAutocompleteInput
                            id="subject"
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
                    </FormGroup>
                    <div className="flex gap-4">
                        <FormGroup
                            for="appraisal-comp"
                            label="Add Appraisal Comp"
                            className="flex-1"
                        >
                            <GoogleMapsAutocompleteInput
                                id="appraisal-comp"
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
                                            id: uuid(),
                                            address,
                                            location,
                                            proximity: 0, // TODO: Calculate proximity
                                        },
                                    ]);
                                }}
                            />
                        </FormGroup>
                        <FormGroup for="rov-sale" label="Add ROV Sale" className="flex-1">
                            <GoogleMapsAutocompleteInput
                                id="rov-sale"
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
                                            id: uuid(),
                                            address,
                                            location,
                                            proximity: 0, // TODO: Calculate proximity
                                        },
                                    ]);
                                }}
                            />
                        </FormGroup>
                    </div>
                    <FormGroup for="comments" label="Comments">
                        <TextArea
                            id="comments"
                            className="h-56"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </FormGroup>
                    {isDebugModeOn && (
                        <div className="max-h-96 overflow-auto bg-gray-100 p-2">
                            <pre>
                                {JSON.stringify(
                                    {
                                        instructions,
                                        subject,
                                        appraisalComps,
                                        rovComps,
                                        comments,
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
                                mapTypeId={'satellite'}
                                mapId={'rov-comps-map'}
                                gestureHandling={'greedy'}
                            >
                                <AdvancedMarker position={subject.location}>
                                    <SubjectPin />
                                </AdvancedMarker>
                                {appraisalComps.length
                                    ? appraisalComps.map((c, index) => {
                                          if (index > 2)
                                              return <Marker position={c.location} key={c.id} />;

                                          const Pin = getCompPinComponent(index, 'appraisal');
                                          return (
                                              <AdvancedMarker position={c.location} key={c.id}>
                                                  <Pin />
                                              </AdvancedMarker>
                                          );
                                      })
                                    : null}
                                {rovComps.length
                                    ? rovComps.map((c, index) => {
                                          if (index > 2)
                                              return <Marker position={c.location} key={c.id} />;
                                          const Pin = getCompPinComponent(index, 'rov');
                                          return (
                                              <AdvancedMarker position={c.location} key={c.id}>
                                                  <Pin />
                                              </AdvancedMarker>
                                          );
                                      })
                                    : null}
                                {(!!appraisalComps.length || !!rovComps.length) && (
                                    <BoundsHandler
                                        subject={subject}
                                        appraisalComps={appraisalComps}
                                        rovComps={rovComps}
                                    />
                                )}
                            </Map>
                        ) : (
                            <div className="bg-surface-readonly flex justify-center items-center h-full w-full">
                                <p>Enter a subject address to view map</p>
                            </div>
                        )}
                        <div className="flex gap-8 mt-8">
                            <div className="flex-1 flex flex-col gap-4">
                                <h3 className="text-lg font-bold">Appraisal Comps</h3>
                                {appraisalComps.length ? (
                                    <CompList>
                                        {appraisalComps.map((comp, index) => (
                                            <CompListItem
                                                key={comp.id}
                                                index={index}
                                                comp={comp}
                                                type="appraisal"
                                                onDelete={() => {
                                                    setAppraisalComps((prev) => {
                                                        return prev.filter((c) => c.id !== comp.id);
                                                    });
                                                }}
                                            />
                                        ))}
                                    </CompList>
                                ) : (
                                    <p>No appraisal comps added</p>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col gap-4">
                                <h3 className="text-lg font-bold">ROV Sales</h3>
                                {rovComps.length ? (
                                    <CompList>
                                        {rovComps.map((comp, index) => (
                                            <CompListItem
                                                key={comp.id}
                                                index={index}
                                                comp={comp}
                                                type="rov"
                                                onDelete={() => {
                                                    setROVComps((prev) => {
                                                        return prev.filter((c) => c.id !== comp.id);
                                                    });
                                                }}
                                            />
                                        ))}
                                    </CompList>
                                ) : (
                                    <p>No ROV comps added</p>
                                )}
                            </div>
                        </div>
                    </div>
                </APIProvider>
            </div>
        </div>
    );
}

function BoundsHandler({
    subject,
    appraisalComps,
    rovComps,
}: {
    subject: SubjectProperty;
    appraisalComps: ComparableProperty[];
    rovComps: ComparableProperty[];
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

        if (all.length <= 1) {
            map.setZoom(12);
        }
    }, [appraisalComps, map, rovComps, subject]);

    return null;
}

export default App;
