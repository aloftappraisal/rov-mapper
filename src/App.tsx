import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { CompList } from './components/CompList';
import { CompListHeader } from './components/CompListHeader';
import { FormGroup } from './components/FormGroup';
import { GoogleMapsAutocompleteInput } from './components/GoogleMapsAutocompleteInput';
import { Map } from './components/Map';
import { TextArea } from './components/TextArea';
import { useComps } from './hooks/useComps';
import { Property } from './types';

// TODO: Handle duplicate addresses

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
    const [instructions, setInstructions] = useState<string>();
    const [subject, setSubject] = useState<Property | null>(null);
    const { appraisalComps, rovComps, addComp, removeComp } = useComps();
    const [comments, setComments] = useState<string>();

    return (
        <div className="bg-blue-300 max-w-[1500px] py-4 px-6 mx-auto min-h-full flex flex-col">
            <header className="mb-8 bg-red-300">
                <h1 className="text-3xl font-bold text-center">ROV Comparables Tool</h1>
            </header>
            <main className="bg-green-300 flex gap-8 flex-col lg:flex-row flex-1">
                <div className="flex flex-col gap-4 self-center lg:self-start lg:basis-[500px]">
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
                <div className="flex-grow w-full lg:w-auto">
                    <div className="h-[500px]">
                        <Map
                            apiKey={GOOGLE_MAPS_API_KEY}
                            subject={subject}
                            appraisalComps={appraisalComps}
                            rovComps={rovComps}
                        />
                    </div>
                    <div className="flex gap-8 mt-8">
                        <div className="flex-1 flex flex-col gap-4">
                            <CompListHeader type="appraisal" numComps={appraisalComps.length} />
                            <CompList
                                type="appraisal"
                                comps={appraisalComps}
                                subject={subject}
                                removeComp={removeComp}
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                            <CompListHeader type="rov" numComps={rovComps.length} />
                            <CompList
                                type="rov"
                                comps={rovComps}
                                subject={subject}
                                removeComp={removeComp}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
