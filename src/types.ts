export type Address = {
    streetNumber: string | undefined;
    streetAddress: string | undefined;
    city: string | undefined;
    state: string | undefined;
    country: string | undefined;
    zip: string | undefined;
    plusFour: string | undefined;
};

export type Coordinates = {
    lat: number;
    lng: number;
};

export type Property = {
    id: string;
    address: Address;
    location: Coordinates;
};

export type CompType = 'appraisal' | 'rov';

export type ButtonLikeSize = 'sm' | 'md';
export type MapMarkerSize = 'sm' | 'md';
export type MapMarkerEnv = 'web' | 'export';
