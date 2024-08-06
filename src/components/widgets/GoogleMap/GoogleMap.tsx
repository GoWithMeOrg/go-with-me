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
import Autocomplete from "./Autocomplete";
import { Input } from "../Input";
export const GoogleMap = () => {
    const apiIsLoaded = useApiIsLoaded();
    const ctx = useContext(APIProviderContext);
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const originRef = useRef<HTMLInputElement>(null);

    if (!apiIsLoaded || !ctx) {
        return;
    }

    // let newPosition;
    // if (selectedPlace?.geometry && selectedPlace.geometry.location) {
    //     newPosition = {
    //         lat: selectedPlace.geometry.location.lat(),
    //         lng: selectedPlace.geometry.location.lng(),
    //     };
    // }

    console.log(markerPosition);

    return (
        <>
            <Map
                style={{ height: "600px" }}
                defaultZoom={3}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                gestureHandling={"greedy"}
                disableDefaultUI={false}
                mapId={"<Your custom MapId here>"}
                onClick={(e) => {
                    setMarkerPosition(e.detail.latLng);
                }}
            >
                {/* {markerPosition && <AdvancedMarker position={markerPosition} />} */}
                <AdvancedMarker
                    position={markerPosition}
                    // draggable={true}
                    title={"AdvancedMarker with customized pin."}
                >
                    <Pin background={"#FBBC04"} borderColor={"#1e89a1"} glyphColor={"#0f677a"}></Pin>
                </AdvancedMarker>
            </Map>
            <CustomMapControl controlPosition={ControlPosition.TOP}>
                <Autocomplete onPlaceSelect={setSelectedPlace} />
            </CustomMapControl>
            <MapHandler place={selectedPlace} />
        </>
    );
};

export default GoogleMap;
