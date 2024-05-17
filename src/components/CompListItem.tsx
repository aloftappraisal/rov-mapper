import { ComparableProperty } from '../types';
import { formatAddress } from '../utils/formatAddress';
import { getCompPinComponent } from '../utils/getCompPinComponent';

type Props = {
    index: number;
    comp: ComparableProperty;
    type: 'appraisal' | 'rov';
    onDelete: () => void;
};

export function CompListItem({ index, comp, type, onDelete }: Props) {
    const Pin = getCompPinComponent(index, type);

    return (
        <li>
            <div className="flex gap-2">
                <span>
                    <Pin />
                </span>
                <div className="flex-grow flex">
                    <span>{formatAddress(comp.address)}</span>
                </div>
                <span>
                    <button className="border border-gray-500 rounded px-2" onClick={onDelete}>
                        x
                    </button>
                </span>
            </div>
        </li>
    );
}
