import React, { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface Props {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    className?: string;
    address?: string;
}
export const Autocomplete = ({ onPlaceSelect, className, address }: Props) => {
    const places = useMapsLibrary("places");
    const originRef = useRef<HTMLInputElement>(null);
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const newAdress = placeAutocomplete?.getPlace()?.formatted_address || address;
    console.log(newAdress); // adвress b newAdress адрес в режиме редатирования приходить правильный
    // если заменить defaultValue на value то адресс меняется.

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

    useEffect(() => {
        if (originRef.current) {
            originRef.current.value = newAdress || "";
        }
    }, [newAdress]);

    return <input className={className} type={"text"} placeholder={""} ref={originRef} defaultValue={newAdress} />;
};

export default Autocomplete;
