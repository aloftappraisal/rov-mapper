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
    const [appraisalComps, setAppraisalComps] = useState<Property[]>([]);
    const [rovComps, setROVComps] = useState<Property[]>([]);

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
