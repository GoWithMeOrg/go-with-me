import React, { useState } from "react";
import { APIProvider, AdvancedMarker, ControlPosition, Map, Pin } from "@vis.gl/react-google-maps";

import { CustomMapControl } from "./CustomMapControl";
import MapHandler from "./MapHandler";
import { MarkerWithInfowindow } from "./MarkerWithInfowindow";
import { Directions } from "./Directions";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export const GoogleMap = () => {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [positionMarker, setPositionMarker] = useState<google.maps.LatLng | null>(null);

    // Доработать установку маркера.
    if (!positionMarker && selectedPlace && selectedPlace.geometry && selectedPlace.geometry.location) {
        const newPosition = new google.maps.LatLng(
            selectedPlace.geometry.location.lat(),
            selectedPlace.geometry.location.lng(),
        );
        setPositionMarker(newPosition);
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
            ></Map>

            <MapHandler place={selectedPlace} />
        </APIProvider>
    );
};

export default GoogleMap;
