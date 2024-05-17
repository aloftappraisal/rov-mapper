import { Address } from '../types';

type AddressComponentType =
    | 'street_number'
    | 'route'
    | 'locality'
    | 'administrative_area_level_1'
    | 'country'
    | 'postal_code'
    | 'postal_code_suffix';

function getFromAddressComponents(
    addressComponents: google.maps.GeocoderAddressComponent[],
    type: AddressComponentType
): string | undefined {
    return addressComponents.find((addressItem) => addressItem.types.includes(type))?.short_name;
}

export function makeAddress(addressComponents: google.maps.GeocoderAddressComponent[]): Address {
    return {
        streetNumber: getFromAddressComponents(addressComponents, 'street_number'),
        streetAddress: getFromAddressComponents(addressComponents, 'route'),
        city: getFromAddressComponents(addressComponents, 'locality'),
        state: getFromAddressComponents(addressComponents, 'administrative_area_level_1'),
        country: getFromAddressComponents(addressComponents, 'country'),
        zip: getFromAddressComponents(addressComponents, 'postal_code'),
        plusFour: getFromAddressComponents(addressComponents, 'postal_code_suffix'),
    };
}
