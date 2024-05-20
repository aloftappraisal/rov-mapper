import { AppraisalComp0Pin } from '../svg/AppraisalComp0Pin';
import { AppraisalComp10Pin } from '../svg/AppraisalComp10Pin';
import { AppraisalComp11Pin } from '../svg/AppraisalComp11Pin';
import { AppraisalComp1Pin } from '../svg/AppraisalComp1Pin';
import { AppraisalComp2Pin } from '../svg/AppraisalComp2Pin';
import { AppraisalComp3Pin } from '../svg/AppraisalComp3Pin';
import { AppraisalComp4Pin } from '../svg/AppraisalComp4Pin';
import { AppraisalComp5Pin } from '../svg/AppraisalComp5Pin';
import { AppraisalComp6Pin } from '../svg/AppraisalComp6Pin';
import { AppraisalComp7Pin } from '../svg/AppraisalComp7Pin';
import { AppraisalComp8Pin } from '../svg/AppraisalComp8Pin';
import { AppraisalComp9Pin } from '../svg/AppraisalComp9Pin';
import { ROVComp0Pin } from '../svg/ROVComp0Pin';
import { ROVComp1Pin } from '../svg/ROVComp1Pin';
import { ROVComp2Pin } from '../svg/ROVComp2Pin';
import { ROVComp3Pin } from '../svg/ROVComp3Pin';
import { ROVComp4Pin } from '../svg/ROVComp4Pin';

const appraisalCompIndexToComponent = {
    '0': AppraisalComp0Pin,
    '1': AppraisalComp1Pin,
    '2': AppraisalComp2Pin,
    '3': AppraisalComp3Pin,
    '4': AppraisalComp4Pin,
    '5': AppraisalComp5Pin,
    '6': AppraisalComp6Pin,
    '7': AppraisalComp7Pin,
    '8': AppraisalComp8Pin,
    '9': AppraisalComp9Pin,
    '10': AppraisalComp10Pin,
    '11': AppraisalComp11Pin,
};
const rovCompIndexToComponent = {
    '0': ROVComp0Pin,
    '1': ROVComp1Pin,
    '2': ROVComp2Pin,
    '3': ROVComp3Pin,
    '4': ROVComp4Pin,
};

export function getCompPinComponent(index: number, type: 'appraisal' | 'rov'): () => JSX.Element {
    if (index > 11) {
        return () => <span>not supported</span>;
    }
    const map = type === 'appraisal' ? appraisalCompIndexToComponent : rovCompIndexToComponent;
    return map[(index + '') as '0' | '1' | '2'];
}
