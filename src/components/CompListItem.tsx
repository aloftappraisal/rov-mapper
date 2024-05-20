import { CloseLine } from '../svg/CloseLine';
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
        <li className="bg-surface-1 p-3 rounded shadow">
            <div className="flex gap-2">
                <span
                    className="mt-[2px]" // visual baseline alignment
                >
                    <Pin />
                </span>
                <div className="flex-grow flex">
                    <span>{formatAddress(comp.address)}</span>
                </div>
                <span className="shrink-0">
                    <button
                        className="p-1  text-button-default border border-button-default rounded bg-surface-1"
                        onClick={onDelete}
                    >
                        <CloseLine />
                    </button>
                </span>
            </div>
        </li>
    );
}
