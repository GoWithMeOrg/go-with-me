import React, { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import classes from "./PlaceAutocomlete.module.css";

interface Props {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    children?: React.ReactNode;
    originRef?: React.RefObject<HTMLInputElement> | null;
    //ref?: React.Ref<HTMLInputElement>;
}
export const PlaceAutocomplete = ({ children, onPlaceSelect, originRef }: Props) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    //const originRef = useRef<HTMLInputElement>(null);
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

        placeAutocomplete.addListener("place_changed", () => {
            const place = placeAutocomplete.getPlace();
            onPlaceSelect(place);
            //Получаем координаты в формате json
            const coordinates = {
                type: "Point",
                coordinates: [place?.geometry?.location?.lng(), place?.geometry?.location?.lat()],
            };

            console.log(coordinates);
        });
    }, [onPlaceSelect, placeAutocomplete]);

    //return children;
    /* {
        <div className={classes.autocompleteContainer}>
            <input ref={originRef} />
        </div>
    } */

    return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ref: originRef } as React.Attributes);
        }
        return child;
    });
};
