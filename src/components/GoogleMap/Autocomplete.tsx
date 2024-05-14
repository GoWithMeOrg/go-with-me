import React, { useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface Props {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    children?: React.ReactNode;
    originRef?: React.RefObject<HTMLInputElement> | null;
}
export const Autocomplete = ({ children, onPlaceSelect, originRef }: Props) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
        if (!places || !originRef || !originRef.current) return;

        const options = {
            fields: ["geometry", "name", "formatted_address"],
        };

        setPlaceAutocomplete(new places.Autocomplete(originRef.current, options));
    }, [originRef, places]);

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
    }, [onPlaceSelect, placeAutocomplete]);

    return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ref: originRef } as React.Attributes);
        }
        return child;
    });
};

export default Autocomplete;
