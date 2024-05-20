import { CompType } from '../types';

type Props = {
    type: CompType;
    numComps: number;
};

export function CompListHeader({ type, numComps }: Props) {
    const compTypeString = type === 'appraisal' ? 'Appraisal' : 'ROV';
    return (
        <h3 className="text-lg font-bold">
            {compTypeString} Comps {numComps ? `(${numComps})` : null}
        </h3>
    );
}
