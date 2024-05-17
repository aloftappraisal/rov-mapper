import { makeAddress } from './utils/makeAddress';
import { ComparableProperty, SubjectProperty } from './types';
import { makeCoordinates } from './utils/makeCoordinates';
import { formatAddress } from './utils/formatAddress';
import { GoogleMapsAutocompleteInput } from './components/GoogleMapsAutocompleteInput';
import { useState } from 'react';

// TODO: Handle duplicate addresses

function App() {
    const [isDebugModeOn, setIsDebugModeOn] = useState(false);

    const [instructions, setInstructions] = useState<string>();
    const [subject, setSubject] = useState<SubjectProperty | null>(null);

    const [appraisalComps, setAppraisalComps] = useState<ComparableProperty[]>([]);
    const [rovComps, setROVComps] = useState<ComparableProperty[]>([]);

    return (
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center">ROV Comparables Tool</h1>
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
                    <div>
                        {appraisalComps.map((comp, index) => (
                            <div key={JSON.stringify(comp.address)}>
                                {index} {formatAddress(comp.address)}
                            </div>
                        ))}
                    </div>
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
                    <div>
                        {rovComps.map((comp, index) => (
                            <div key={JSON.stringify(comp.address)}>
                                {index} {formatAddress(comp.address)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isDebugModeOn && (
                <div className="mt-14 max-h-96 overflow-auto">
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
    );
}

export default App;
