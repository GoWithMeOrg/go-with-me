import React, { useContext, useState, useCallback, useEffect } from "react";
import { APIProviderContext, Map, ControlPosition, useApiIsLoaded, useMap } from "@vis.gl/react-google-maps";
import { Autocomplete } from "./Autocomplete";
import { MapHandlerBounds } from "./MapHandlerBounds";
import { optionsFullAdress } from "./OptionsAutocomplete";
import { CustomMapControl } from "./CustomMapControl";
import { IEvent } from "./types/Type";
import { MapController } from "./MapController";
import { CardEventMap } from "../CardEventMap/CardEventMap";

interface Props {
    events?: IEvent[];
    selectedLocation?: google.maps.places.PlaceResult | null;
}

export const GoogleMap: React.FC<Props> = ({ events = [], selectedLocation }) => {
    const apiIsLoaded = useApiIsLoaded();
    const ctx = useContext(APIProviderContext);
    const map = useMap();
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    const handleMarkerClick = useCallback((event: IEvent, offsetLat: number, offsetLng: number) => {
        setSelectedEventId(event._id);
    }, []);

    useEffect(() => {
        if (map && selectedLocation?.geometry?.viewport) {
            const bounds = selectedLocation.geometry.viewport;
            map.fitBounds(bounds);
        }
    }, [map, selectedLocation]);

    if (!apiIsLoaded || !ctx) return null;

    const selectedEvent = events.find((e) => e._id === selectedEventId);

    return (
        <div style={{ display: "flex", height: "600px" }}>
            {/* Sidebar карточка */}
            {selectedEvent && <CardEventMap selectedEvent={selectedEvent} />}

            {/* Карта */}
            <div style={{ flex: 1, position: "relative" }}>
                <Map
                    defaultZoom={3}
                    defaultCenter={{ lat: 55.7558, lng: 37.6173 }}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                    mapId={"<Your custom MapId here>"}
                    onClick={() => setSelectedEventId(null)}
                >
                    <MapController
                        onMarkerClick={handleMarkerClick}
                        selectedEventId={selectedEventId}
                        events={events}
                    />
                </Map>

                <CustomMapControl controlPosition={ControlPosition.TOP}>
                    <Autocomplete onPlaceSelect={setSelectedPlace} options={optionsFullAdress} />
                </CustomMapControl>
                <MapHandlerBounds place={selectedPlace} />
            </div>
        </div>
    );
};
