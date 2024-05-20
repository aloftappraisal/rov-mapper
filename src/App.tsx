import { APIProvider, AdvancedMarker, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { CompList } from './components/CompList';
import { CompListItem } from './components/CompListItem';
import { GoogleMapsAutocompleteInput } from './components/GoogleMapsAutocompleteInput';
import { SubjectPin } from './svg/SubjectPin';
import { ComparableProperty, SubjectProperty } from './types';
import { getCompPinComponent } from './utils/getCompPinComponent';
import { v4 as uuid } from 'uuid';
import { FormGroup } from './components/FormGroup';
import { TextArea } from './components/TextArea';
import { getDistance } from './utils/getDistance';

// TODO: Handle duplicate addresses

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
                            onPlaceChange={({ address, location }) => {
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
                                onPlaceChange={({ address, location }) => {
                                    setAppraisalComps((prev) => [
                                        ...prev,
                                        {
                                            id: uuid(),
                                            address,
                                            location,
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
                                onPlaceChange={({ address, location }) => {
                                    setROVComps((prev) => [
                                        ...prev,
                                        {
                                            id: uuid(),
                                            address,
                                            location,
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
                <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <div className="flex-grow w-full lg:w-auto h-[500px]">
                        <Map
                            defaultZoom={4}
                            defaultCenter={{
                                lat: 36.205143,
                                lng: -98.4736295,
                            }}
                            streetViewControl={false}
                            mapTypeId={'satellite'}
                            mapId={'rov-comps-map'}
                            gestureHandling={'greedy'}
                        >
                            {subject && (
                                <AdvancedMarker position={subject.location}>
                                    <SubjectPin />
                                </AdvancedMarker>
                            )}
                            {appraisalComps.length
                                ? appraisalComps.map((c, index) => {
                                      if (index > 11)
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
                                      if (index > 11)
                                          return <Marker position={c.location} key={c.id} />;
                                      const Pin = getCompPinComponent(index, 'rov');
                                      return (
                                          <AdvancedMarker position={c.location} key={c.id}>
                                              <Pin />
                                          </AdvancedMarker>
                                      );
                                  })
                                : null}
                            <BoundsHandler
                                subject={subject}
                                appraisalComps={appraisalComps}
                                rovComps={rovComps}
                            />
                        </Map>
                        <div className="flex gap-8 mt-8">
                            <div className="flex-1 flex flex-col gap-4">
                                <h3 className="text-lg font-bold">
                                    Appraisal Comps{' '}
                                    {appraisalComps.length ? `(${appraisalComps.length})` : null}
                                </h3>
                                {appraisalComps.length ? (
                                    <CompList>
                                        {appraisalComps.map((comp, index) => (
                                            <CompListItem
                                                key={comp.id}
                                                index={index}
                                                comp={{
                                                    ...comp,
                                                    distance:
                                                        subject !== null
                                                            ? getDistance(
                                                                  subject.location,
                                                                  comp.location
                                                              )
                                                            : null,
                                                }}
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
                                <h3 className="text-lg font-bold">
                                    ROV Sales {rovComps.length ? `(${rovComps.length})` : null}
                                </h3>
                                {rovComps.length ? (
                                    <CompList>
                                        {rovComps.map((comp, index) => (
                                            <CompListItem
                                                key={comp.id}
                                                index={index}
                                                comp={{
                                                    ...comp,
                                                    distance:
                                                        subject !== null
                                                            ? getDistance(
                                                                  subject.location,
                                                                  comp.location
                                                              )
                                                            : null,
                                                }}
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
    subject: SubjectProperty | null;
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

        if (all.length === 1) {
            map.setZoom(12);
            map.setCenter(all[0].location);
        }
    }, [appraisalComps, map, rovComps, subject]);

    return null;
}

export default App;
