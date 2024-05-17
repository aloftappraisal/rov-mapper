import { useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { makeAddress } from './utils/makeAddress';
import { SubjectProperty } from './types';
import { makeCoordinates } from './utils/makeCoordinates';

const G_MAPS_API_KEY = 'AIzaSyDMft9zkCHh_o2BtOh8-_8tPstDgTSb5b0';

// TODO: Restrict to US addresses
const shared = {
    apiKey: G_MAPS_API_KEY,
    options: {
        types: ['address'],
    },
};

function App() {
    const [instructions, setInstructions] = useState<string>();
    const [subject, setSubject] = useState<SubjectProperty | null>(null);

    const { ref: subjectRef } = usePlacesWidget<HTMLInputElement>({
        ...shared,
        onPlaceSelected: (place) => {
            console.log('PLACE: ', place);
            if (!place?.geometry?.location) return;
            if (!place?.address_components?.length) return;

            const address = makeAddress(place.address_components);
            const location = makeCoordinates(place.geometry.location);

            setSubject({
                address,
                location,
            });
        },
    });

    console.log({ instructions, subject });

    return (
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center">ROV Comparables Tool</h1>
            <div>
                <div>
                    <label htmlFor="instructions">Instructions</label>
                </div>
                <textarea
                    id="instructions"
                    className="w-full h-12 border border-gray-500"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />
            </div>
            ;
            <div>
                <div>
                    <label htmlFor="subject">Subject property adress</label>
                </div>
                <input
                    ref={subjectRef}
                    id="subject"
                    className="w-full border border-gray-500"
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setSubject(null);
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default App;
