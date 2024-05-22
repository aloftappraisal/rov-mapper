import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Address, CompType, Coordinates, Property } from '../types';
import { getMaxComps } from '../utils/getMaxComps';

type UseCompsReturn = {
    appraisalComps: Property[];
    rovComps: Property[];
    canAddAppraisalComp: boolean;
    canAddROVComp: boolean;
    addComp: (type: CompType, comp: { address: Address; location: Coordinates }) => void;
    removeComp: (type: CompType, id: Property['id']) => void;
};

export function useComps(): UseCompsReturn {
    const [appraisalComps, setAppraisalComps] = useState<Property[]>([]);
    const [rovComps, setROVComps] = useState<Property[]>([]);

    const canAddAppraisalComp = appraisalComps.length < getMaxComps('appraisal');
    const canAddROVComp = rovComps.length < getMaxComps('rov');

    const addComp: UseCompsReturn['addComp'] = (type, comp) => {
        const canAddComp = type === 'appraisal' ? canAddAppraisalComp : canAddROVComp;
        if (!canAddComp) return;

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
        canAddAppraisalComp,
        canAddROVComp,
        addComp,
        removeComp,
    };
}
