import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Address, CompType, Coordinates, Property } from '../types';

type UseCompsReturn = {
    appraisalComps: Property[];
    rovComps: Property[];
    addComp: (type: CompType, comp: { address: Address; location: Coordinates }) => void;
    removeComp: (type: CompType, id: Property['id']) => void;
};

export function useComps(): UseCompsReturn {
    const [appraisalComps, setAppraisalComps] = useState<Property[]>([
        {
            id: 'fe27b80d-a034-4404-af4e-406fecfec7cd',
            address: {
                streetNumber: '12728',
                streetAddress: 'Monica St',
                city: 'Detroit',
                state: 'MI',
                country: 'US',
                zip: '48238',
                plusFour: '5137',
            },
            location: {
                lat: 42.38301209999999,
                lng: -83.1423337,
            },
        },
        {
            id: 'bb562d42-271a-4029-be22-5499678a25b4',
            address: {
                streetNumber: '12703',
                streetAddress: 'Stoepel St',
                city: 'Detroit',
                state: 'MI',
                country: 'US',
                zip: '48238',
                plusFour: '4225',
            },
            location: {
                lat: 42.3826647,
                lng: -83.1407255,
            },
        },
        {
            id: '4d53f2f4-4503-4849-957f-8f310a2b27ee',
            address: {
                streetNumber: '4059',
                streetAddress: 'Tyler St',
                city: 'Detroit',
                state: 'MI',
                country: 'US',
                zip: '48238',
                plusFour: '5290',
            },
            location: {
                lat: 42.3868659,
                lng: -83.1334704,
            },
        },
    ]);
    const [rovComps, setROVComps] = useState<Property[]>([
        {
            id: '3e77106e-7f67-45dc-a7d1-775955dbdeea',
            address: {
                streetNumber: '12374',
                streetAddress: 'Stoepel St',
                city: 'Detroit',
                state: 'MI',
                country: 'US',
                zip: '48204',
                plusFour: '1243',
            },
            location: {
                lat: 42.38043769999999,
                lng: -83.1400465,
            },
        },
        {
            id: '33ce7a25-6b9f-4293-b172-97dfc54fc099',
            address: {
                streetNumber: '3800',
                streetAddress: 'Tyler St',
                city: 'Detroit',
                state: 'MI',
                country: 'US',
                zip: '48238',
                plusFour: undefined,
            },
            location: {
                lat: 42.387923,
                lng: -83.13188389999999,
            },
        },
        {
            id: 'bbe03de7-3684-4217-b016-91891edcb994',
            address: {
                streetNumber: '2634',
                streetAddress: 'Pasadena St',
                city: 'Detroit',
                state: 'MI',
                country: 'US',
                zip: '48238',
                plusFour: '2716',
            },
            location: {
                lat: 42.39530010000001,
                lng: -83.1244122,
            },
        },
    ]);

    const addComp: UseCompsReturn['addComp'] = (type, comp) => {
        const setter = type === 'appraisal' ? setAppraisalComps : setROVComps;
        setter((prev) => [
            ...prev,
            {
                id: uuid(),
                address: comp.address,
                location: comp.location,
            },
        ]);
    };

    const removeComp: UseCompsReturn['removeComp'] = (type, id) => {
        const setter = type === 'appraisal' ? setAppraisalComps : setROVComps;
        setter((prev) => {
            return prev.filter((comp) => comp.id !== id);
        });
    };

    return {
        appraisalComps,
        rovComps,
        addComp,
        removeComp,
    };
}
