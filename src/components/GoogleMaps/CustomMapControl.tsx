import React from "react";
import { AdvancedMarker, ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "./PlaceAutocomplete";
import Directions from "./Directions";

type CustomAutocompleteControlProps = {
    controlPosition: ControlPosition; // свойство где конкретно будет размещен поиск.
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const CustomMapControl = ({ controlPosition, onPlaceSelect }: CustomAutocompleteControlProps) => {
    return (
        <MapControl position={controlPosition}>
            {/* размещение поиска */}
            {/* <PlaceAutocomplete onPlaceSelect={onPlaceSelect} /> */}
            <Directions onPlaceSelect={onPlaceSelect} />
        </MapControl>
    );
};
