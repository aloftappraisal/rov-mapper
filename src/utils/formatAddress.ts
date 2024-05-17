import { Address } from '../types';

const FALLBACK = '(unknown)';

export function formatAddress(address: Address): string {
    const {
        streetNumber = FALLBACK,
        streetAddress = FALLBACK,
        city = FALLBACK,
        state = FALLBACK,
        zip = FALLBACK,
    } = address;
    return `${streetNumber} ${streetAddress}, ${city}, ${state} ${zip}`;
}
