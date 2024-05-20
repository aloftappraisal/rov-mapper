import { useEffect, useRef } from 'react';
import { Input } from './Input';
import { Address, Coordinates } from '../types';
import { makeAddress } from '../utils/makeAddress';
import { makeCoordinates } from '../utils/makeCoordinates';

type Props = {
    onPlaceChange: (params: { address: Address; location: Coordinates }) => void;
    clearOnPlaceChange?: boolean;
    onBlur?: (p: google.maps.places.PlaceResult | null) => void;
} & Omit<React.HTMLProps<HTMLInputElement>, 'onBlur'>;

export function GoogleMapsAutocompleteInput({
    onPlaceChange,
    clearOnPlaceChange = false,
    ...rest
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: {
                country: 'US',
            },
        });

        autocompleteRef.current = autocomplete;

        const listener = autocomplete.addListener('place_changed', () => {
            const place = autocomplete?.getPlace();

            if (!place?.geometry?.location) return;
            if (!place?.address_components?.length) return;

            const address = makeAddress(place.address_components);
            const location = makeCoordinates(place.geometry.location);

            onPlaceChange({ address, location });

            if (clearOnPlaceChange && place !== null) {
                autocomplete.set('place', null);
                if (inputRef.current) inputRef.current.value = '';
            }
        });

        return () => {
            listener.remove();
        };
    }, [clearOnPlaceChange, onPlaceChange]);

    return (
        <Input
            ref={inputRef}
            id="autocompleteInput"
            type="text"
            placeholder="Enter a location"
            {...rest}
            onBlur={(event) => {
                if (!autocompleteRef.current) return;
                if (!event.target.value) {
                    autocompleteRef.current?.set('place', null);
                    event.target.value = '';
                    rest.onBlur?.(null);
                } else {
                    rest.onBlur?.(autocompleteRef.current.getPlace());
                }
            }}
        />
    );
}
