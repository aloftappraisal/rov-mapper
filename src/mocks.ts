import { Property } from './types';

export const mockSubject: Property = {
    id: '1e69869f-8484-4a08-b1a2-290b9835ef70',
    address: {
        streetNumber: '13167',
        streetAddress: 'Stoepel St',
        city: 'Detroit',
        state: 'MI',
        country: 'US',
        zip: '48238',
        plusFour: '5101',
    },
    location: {
        lat: 42.3850821,
        lng: -83.1407974,
    },
};

export const mockAppraisalComps: Property[] = [
    {
        id: 'fe27b80d-a034-4404-af4e-406fecfec7cd',
        address: {
            streetNumber: '12728',
            streetAddress: 'Monica St',
            city: 'Detroit',
            state: 'MI',
            country: 'US',
            zip: '48238',
            plusFour: '5137',
        },
        location: {
            lat: 42.38301209999999,
            lng: -83.1423337,
        },
    },
    {
        id: 'bb562d42-271a-4029-be22-5499678a25b4',
        address: {
            streetNumber: '12703',
            streetAddress: 'Stoepel St',
            city: 'Detroit',
            state: 'MI',
            country: 'US',
            zip: '48238',
            plusFour: '4225',
        },
        location: {
            lat: 42.3826647,
            lng: -83.1407255,
        },
    },
    {
        id: '4d53f2f4-4503-4849-957f-8f310a2b27ee',
        address: {
            streetNumber: '4059',
            streetAddress: 'Tyler St',
            city: 'Detroit',
            state: 'MI',
            country: 'US',
            zip: '48238',
            plusFour: '5290',
        },
        location: {
            lat: 42.3868659,
            lng: -83.1334704,
        },
    },
];

export const mockROVComps: Property[] = [
    {
        id: '3e77106e-7f67-45dc-a7d1-775955dbdeea',
        address: {
            streetNumber: '12374',
            streetAddress: 'Stoepel St',
            city: 'Detroit',
            state: 'MI',
            country: 'US',
            zip: '48204',
            plusFour: '1243',
        },
        location: {
            lat: 42.38043769999999,
            lng: -83.1400465,
        },
    },
    {
        id: '33ce7a25-6b9f-4293-b172-97dfc54fc099',
        address: {
            streetNumber: '3800',
            streetAddress: 'Tyler St',
            city: 'Detroit',
            state: 'MI',
            country: 'US',
            zip: '48238',
            plusFour: undefined,
        },
        location: {
            lat: 42.387923,
            lng: -83.13188389999999,
        },
    },
    {
        id: 'bbe03de7-3684-4217-b016-91891edcb994',
        address: {
            streetNumber: '2634',
            streetAddress: 'Pasadena St',
            city: 'Detroit',
            state: 'MI',
            country: 'US',
            zip: '48238',
            plusFour: '2716',
        },
        location: {
            lat: 42.39530010000001,
            lng: -83.1244122,
        },
    },
];

export const mockComments =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non faucibus dolor, vel eleifend velit. In sagittis condimentum mi, vitae tempor sem lobortis pretium. Pellentesque faucibus sollicitudin ex, id lacinia odio porttitor efficitur. Morbi nisi tortor, finibus in erat eget, laoreet aliquam lorem. Quisque sodales magna velit, ac tincidunt nisl congue id. Nulla mollis odio id accumsan tempor. Praesent maximus cursus felis, ac tincidunt elit porttitor vel. Donec quis scelerisque odio. Duis porta lacus sit amet ipsum maximus euismod. Duis vitae ipsum eu nulla mollis pellentesque at sit amet felis. Phasellus non augue at mauris pharetra molestie at non nulla. Fusce blandit lorem nec leo eleifend varius. Fusce sit amet scelerisque dolor, ut scelerisque mi.';
