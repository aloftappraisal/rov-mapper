import { AppraisalComp0Pin } from '../svg/AppraisalComp0Pin';
import { AppraisalComp1Pin } from '../svg/AppraisalComp1Pin';
import { AppraisalComp2Pin } from '../svg/AppraisalComp2Pin';
import { ROVComp0Pin } from '../svg/ROVComp0Pin';
import { ROVComp1Pin } from '../svg/ROVComp1Pin';
import { ROVComp2Pin } from '../svg/ROVComp2Pin';

const appraisalCompIndexToComponent = {
    '0': AppraisalComp0Pin,
    '1': AppraisalComp1Pin,
    '2': AppraisalComp2Pin,
};
const rovCompIndexToComponent = {
    '0': ROVComp0Pin,
    '1': ROVComp1Pin,
    '2': ROVComp2Pin,
};

export function getCompPinComponent(index: number, type: 'appraisal' | 'rov'): () => JSX.Element {
    if (index > 2) {
        return () => <span>not supported</span>;
    }
    const map = type === 'appraisal' ? appraisalCompIndexToComponent : rovCompIndexToComponent;
    return map[(index + '') as '0' | '1' | '2'];
}
