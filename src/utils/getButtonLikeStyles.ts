import { ButtonLikeSize } from '../types';

const smSx = 'h-6 px-3 py-1 text-xs';
const mdSx = 'px-10 py-3 h-10 text-sm';

const sharedSx =
    'font-bold border text-white bg-button-default rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';

export function getButtonLikeStyles(size: ButtonLikeSize): string {
    return `${sharedSx} ${size === 'sm' ? smSx : mdSx}`;
}
