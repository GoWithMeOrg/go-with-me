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
    const inputRef = useRef<HTMLInputElement>(null);
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const createAutocomplete = useCallback(() => {
        if (!places || !inputRef.current) return;

        const autocomplete = new places.Autocomplete(inputRef.current, options);
        setPlaceAutocomplete(autocomplete);

        return autocomplete;
    }, [places, options]);

    useEffect(() => {
        const autocomplete = createAutocomplete();
        return () => {
            if (autocomplete) {
                google.maps.event.clearInstanceListeners(autocomplete);
            }
        };
    }, [createAutocomplete]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        const handlePlaceChanged = () => {
            const place = placeAutocomplete.getPlace();
            onPlaceSelect(place);
        };

        const listener = placeAutocomplete.addListener("place_changed", handlePlaceChanged);

        return () => {
            if (listener) {
                listener.remove();
            }
        };
    }, [placeAutocomplete, onPlaceSelect]);

    useEffect(() => {
        if (inputRef.current && address) {
            inputRef.current.value = address;
        }
    }, [address]);

    useEffect(() => {
        const stopPropagation = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest(".pac-container")) {
                e.stopPropagation();
            }
        };

        document.addEventListener("mousedown", stopPropagation, true);

        return () => {
            document.removeEventListener("mousedown", stopPropagation, true);
        };
    }, []);

    return (
        <input ref={inputRef} className={className} type="text" placeholder="Введите адрес" defaultValue={address} />
    );
};

export default Autocomplete;
