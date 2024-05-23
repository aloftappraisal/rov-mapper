import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import SamHead from './assets/sam-head-right-500.png';
import { Button } from './components/Button';
import { CompList } from './components/CompList';
import { CompListHeader } from './components/CompListHeader';
import { FormGroup } from './components/FormGroup';
import { GoogleMapsAutocompleteInput } from './components/GoogleMapsAutocompleteInput';
import { Map } from './components/Map';
import { TextArea } from './components/TextArea';
import { useComps } from './hooks/useComps';
import { useExport } from './hooks/useExport';
import { Logo } from './svg/Logo';
import { Property } from './types';
import { Link } from './components/Link';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
    const [subject, setSubject] = useState<Property | null>(null);
    const { appraisalComps, rovComps, canAddAppraisalComp, canAddROVComp, addComp, removeComp } =
        useComps();
    const [comments, setComments] = useState<string>('');

    const { isReady, downloadPDF } = useExport({
        subject,
        appraisalComps,
        rovComps,
        comments,
        apiKey: GOOGLE_MAPS_API_KEY,
    });

    return (
        <div className="h-full flex flex-col lg:overflow-hidden">
            <header className="bg-surface-1 shrink-0 h-12 border-b border-stroke-light px-2 flex items-center justify-between">
                <div className="flex items-center justify-between gap-3">
                    <a href="https://www.aloftappraisal.com" target="_blank">
                        <Logo />
                    </a>
                    <h1 className="text-xl font-bold text-center">ROV Mapper</h1>
                </div>
            </header>
            <main className="flex-grow flex flex-col lg:flex-row gap-8 lg:overflow-hidden lg:max-w-[1500px] lg:w-full lg:mx-auto p-4">
                <div className="flex flex-col gap-4 self-center lg:self-start lg:basis-[500px] shrink-0">
                    <FormGroup for="subject" label="Subject Property Address">
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
                                disabled={!canAddAppraisalComp}
                                clearOnPlaceChange
                                onPlaceChange={({ address, location }) => {
                                    addComp('appraisal', { address, location });
                                }}
                            />
                        </FormGroup>
                        <FormGroup for="rov-comp" label="Add ROV Comp" className="flex-1">
                            <GoogleMapsAutocompleteInput
                                id="rov-comp"
                                disabled={!canAddROVComp}
                                clearOnPlaceChange
                                onPlaceChange={({ address, location }) => {
                                    addComp('rov', { address, location });
                                }}
                            />
                        </FormGroup>
                    </div>
                    <FormGroup for="comments" label="Reconsideration of Value Comments">
                        <TextArea
                            id="comments"
                            className="h-96"
                            placeholder="Enter comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </FormGroup>
                    <Button disabled={!isReady} onClick={downloadPDF}>
                        Export to PDF
                    </Button>
                </div>
                <div className="flex flex-col lg:overflow-auto flex-grow">
                    <div className="h-[500px] shrink-0">
                        <Map
                            apiKey={GOOGLE_MAPS_API_KEY}
                            subject={subject}
                            appraisalComps={appraisalComps}
                            rovComps={rovComps}
                        />
                    </div>
                    <div className="flex gap-8 mt-8 flex-grow lg:overflow-hidden">
                        <div className="flex-1 flex flex-col gap-4 lg:overflow-auto">
                            <CompListHeader type="appraisal" numComps={appraisalComps.length} />
                            <div className="lg:overflow-auto">
                                <CompList
                                    type="appraisal"
                                    comps={appraisalComps}
                                    subject={subject}
                                    removeComp={removeComp}
                                />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-4 lg:overflow-auto">
                            <CompListHeader type="rov" numComps={rovComps.length} />
                            <div className="lg:overflow-auto">
                                <CompList
                                    type="rov"
                                    comps={rovComps}
                                    subject={subject}
                                    removeComp={removeComp}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="shrink-0 w-full bg-surface-3 py-2 text-text-primary border-t flex items-center justify-center gap-4 border-stroke-default px-2">
                <div className="flex px-3 py-2 gap-4 border border-stroke-light bg-surface-1 rounded items-center">
                    <div className="w-[60px] h-[60px] bg-selected-2 rounded-full relative shrink-0">
                        <img src={SamHead} className="w-[60px] h-[60px] absolute rounded-full" />
                    </div>
                    <p className="text-sm text-center max-w-60">
                        Looking for data-backed adjustment support in your market? Check out our{' '}
                        <a
                            id="toolkit-info-link"
                            href="https://www.aloftappraisal.com/appraiser-toolkit"
                            target="_blank"
                            className="text-button-default"
                        >
                            Appraiser Toolkit
                        </a>
                        .
                    </p>
                    <div className="flex flex-col gap-1 shrink-0 items-center">
                        <Link
                            id="toolkit-signup-link"
                            href="http://toolkit.aloftappraisal.com/?sign_up"
                            target="_blank"
                        >
                            Try Toolkit for Free!
                        </Link>
                        <p className="text-text-secondary text-xs">
                            First 30 days free, then $29/month
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
