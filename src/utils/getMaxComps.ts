import { MAX_APPRAISAL_COMPS, MAX_ROV_COMPS } from '../consts';
import { CompType } from '../types';

export function getMaxComps(compType: CompType): number {
    return compType === 'appraisal' ? MAX_APPRAISAL_COMPS : MAX_ROV_COMPS;
}
