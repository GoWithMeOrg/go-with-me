import React, { useState } from "react";
import { APIProvider, AdvancedMarker, ControlPosition, Map, Pin } from "@vis.gl/react-google-maps";

import { CustomMapControl } from "./CustomMapControl";
import MapHandler from "./MapHandler";
import { MarkerWithInfowindow } from "./MarkerWithInfowindow";
import { Directions } from "./Directions";
import { PlaceAutocomplete } from "./PlaceAutocomplete";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export const GoogleMap = () => {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

    let newPosition;
    if (selectedPlace?.geometry && selectedPlace.geometry.location) {
        newPosition = {
            lat: selectedPlace.geometry.location.lat(),
            lng: selectedPlace.geometry.location.lng(),
        };
    }

    return (
        <APIProvider apiKey={API_KEY}>
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
                {/* <PlaceAutocomplete onPlaceSelect={setSelectedPlace} /> */}
                <Directions onPlaceSelect={setSelectedPlace} />
            </CustomMapControl>
            <MapHandler place={selectedPlace} />
        </APIProvider>
    );
};

export default GoogleMap;
