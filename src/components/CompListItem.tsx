import { CloseLine } from '../svg/CloseLine';
import { CompType, Property } from '../types';
import { formatAddress } from '../utils/formatAddress';
import { formatDistance } from '../utils/formatDistance';
import { CompMarkerSVG } from './CompMarkerSVG';

type Props = {
    index: number;
    comp: Property & { distance: number | null };
    type: CompType;
    onDelete: () => void;
};

export function CompListItem({ index, comp, type, onDelete }: Props) {
    return (
        <li className="bg-surface-1 p-3 rounded shadow">
            <div className="flex gap-2">
                <span
                    className="mt-[2px] shrink-0" // visual baseline alignment
                >
                    <CompMarkerSVG type={type} index={index} env="web" size="sm" />
                </span>
                <div className="flex-grow flex flex-col">
                    <span>{formatAddress(comp.address)}</span>
                    <span className="text-sm text-text-secondary">
                        {formatDistance(comp.distance)}
                    </span>
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
