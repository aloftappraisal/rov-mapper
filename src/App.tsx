import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { CompList } from './components/CompList';
import { CompListItem } from './components/CompListItem';
import { FormGroup } from './components/FormGroup';
import { GoogleMapsAutocompleteInput } from './components/GoogleMapsAutocompleteInput';
import { Map } from './components/Map';
import { TextArea } from './components/TextArea';
import { useComps } from './hooks/useComps';
import { Property } from './types';
import { getDistance } from './utils/getDistance';

// TODO: Handle duplicate addresses

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
    const [instructions, setInstructions] = useState<string>();
    const [subject, setSubject] = useState<Property | null>(null);

    const { appraisalComps, rovComps, addComp, removeComp } = useComps();

    const [comments, setComments] = useState<string>();

    return (
        <div className="max-w-[1500px] py-4 px-6 mx-auto flex flex-col gap-8 min-h-full">
            <h1 className="text-3xl font-bold text-center">ROV Comparables Tool</h1>
            <div className="flex gap-8 flex-col lg:flex-row flex-1">
                <div className="lg:basis-[500px] flex flex-col gap-4 self-center lg:self-start">
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
                            onPlaceChange={({ address, location }) => {
                                setSubject({
                                    id: uuid(),
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
                                clearOnPlaceChange
                                onPlaceChange={({ address, location }) => {
                                    addComp('appraisal', { address, location });
                                }}
                            />
                        </FormGroup>
                        <FormGroup for="rov-sale" label="Add ROV Sale" className="flex-1">
                            <GoogleMapsAutocompleteInput
                                id="rov-sale"
                                clearOnPlaceChange
                                onPlaceChange={({ address, location }) => {
                                    addComp('rov', { address, location });
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
                </div>
                <div className="flex-grow w-full lg:w-auto h-[500px]">
                    <Map
                        apiKey={GOOGLE_MAPS_API_KEY}
                        subject={subject}
                        appraisalComps={appraisalComps}
                        rovComps={rovComps}
                    />
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
                                                removeComp('appraisal', comp.id);
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
                                                removeComp('rov', comp.id);
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
            </div>
        </div>
    );
}

export default App;
