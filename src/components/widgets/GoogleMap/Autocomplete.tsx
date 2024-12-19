import React, { useEffect, useRef, useState, useCallback } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface Props {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    className?: string;
    address?: string;
    options: google.maps.places.AutocompleteOptions;
}

export const Autocomplete = ({ onPlaceSelect, className, address, options }: Props) => {
    const places = useMapsLibrary("places");
    const originRef = useRef<HTMLInputElement>(null);
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const newAdress = placeAutocomplete?.getPlace()?.formatted_address || address;

    const createAutocomplete = useCallback(() => {
        if (!places || !originRef || !originRef.current) return;

        setPlaceAutocomplete(new places.Autocomplete(originRef.current, options));
    }, [places, originRef, options]);

    useEffect(() => {
        createAutocomplete();
    }, [createAutocomplete]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        const placeChangedListener = placeAutocomplete.addListener("place_changed", () => {
            const place = placeAutocomplete.getPlace();
            onPlaceSelect(place);

            return () => {
                placeChangedListener.remove();
                setPlaceAutocomplete(null);
            };
        });

        if (originRef.current) {
            originRef.current.value = newAdress || "";
        }
    }, [onPlaceSelect, placeAutocomplete, newAdress]);

    return <input className={className} type="text" placeholder="" ref={originRef} defaultValue={newAdress} />;
};

export default Autocomplete;
