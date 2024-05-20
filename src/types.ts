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

export type SubjectProperty = {
    address: Address;
    location: Coordinates;
};

export type ComparableProperty = {
    id: string;
    address: Address;
    location: Coordinates;
};
