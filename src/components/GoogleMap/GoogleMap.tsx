import React, { useContext, useRef, useState } from "react";
import {
    APIProviderContext,
    AdvancedMarker,
    ControlPosition,
    Map,
    Pin,
    useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { CustomMapControl } from "./CustomMapControl";
import MapHandler from "./MapHandler";
import { PlaceAutocomplete } from "./PlaceAutocomplete";
import { Input } from "../Input";
export const GoogleMap = () => {
    const apiIsLoaded = useApiIsLoaded();
    const ctx = useContext(APIProviderContext);
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const originRef = useRef<HTMLInputElement>(null);

    if (!apiIsLoaded || !ctx) {
        return;
    }

    let newPosition;
    if (selectedPlace?.geometry && selectedPlace.geometry.location) {
        newPosition = {
            lat: selectedPlace.geometry.location.lat(),
            lng: selectedPlace.geometry.location.lng(),
        };
    }

    return (
        <>
            <Map
                style={{ height: "600px" }}
                defaultZoom={3}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                gestureHandling={"greedy"}
                disableDefaultUI={false}
                mapId={"<Your custom MapId here>"}
            >
                <AdvancedMarker position={newPosition} title={"AdvancedMarker with customized pin."}>
                    <Pin background={"#FBBC04"} borderColor={"#1e89a1"} glyphColor={"#0f677a"}></Pin>
                </AdvancedMarker>
            </Map>
            <CustomMapControl controlPosition={ControlPosition.TOP}>
                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                    <Input type={"text"} placeholder={"Найти ..."} />
                </PlaceAutocomplete>
            </CustomMapControl>
            <MapHandler place={selectedPlace} />
        </>
    );
};

export default GoogleMap;
