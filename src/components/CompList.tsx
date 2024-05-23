import { CompType, Property } from '../types';
import { getDistance } from '../utils/getDistance';
import { CompListItem } from './CompListItem';

type Props = {
    type: CompType;
    subject: Property | null;
    comps: Property[];
    removeComp: (t: CompType, id: string) => void;
};

export function CompList({ type, comps, subject, removeComp }: Props) {
    if (!comps.length) {
        const compTypeString = type === 'appraisal' ? 'appraisal' : 'ROV';
        return <p className="mb-4 lg:mb-0">No {compTypeString} comps added</p>;
    }

    return (
        <ol className="flex flex-col gap-2">
            {comps.map((comp, index) => (
                <CompListItem
                    key={comp.id}
                    index={index}
                    comp={{
                        ...comp,
                        distance:
                            subject !== null ? getDistance(subject.location, comp.location) : null,
                    }}
                    type={type}
                    onDelete={() => {
                        removeComp(type, comp.id);
                    }}
                />
            ))}
        </ol>
    );
}
