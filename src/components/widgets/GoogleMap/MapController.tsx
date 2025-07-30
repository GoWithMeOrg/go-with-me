import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef } from "react";
import { IEvent } from "./types/Type";
import { MAP_CONSTANTS, COLORS } from "@/constants/map";

interface MapControllerProp {
    onMarkerClick: (event: IEvent, offsetLat: number, offsetLng: number) => void;
    selectedEventId: string | null;
    events: IEvent[] | [];
}

export const MapController = ({ onMarkerClick, selectedEventId, events }: MapControllerProp) => {
    const map = useMap();
    const mapRef = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        if (map && !mapRef.current) {
            mapRef.current = map;
        }
    }, [map]);

    const handleMarkerClick = useCallback(
        (event: IEvent, offsetLat: number, offsetLng: number) => {
            if (mapRef.current) {
                const position = { lat: offsetLat, lng: offsetLng };
                const currentZoom = mapRef.current.getZoom();

                mapRef.current.panTo(position);

                if (currentZoom && currentZoom < MAP_CONSTANTS.MIN_ZOOM) {
                    mapRef.current.setZoom(MAP_CONSTANTS.TARGET_ZOOM);
                }
            }
            onMarkerClick(event, offsetLat, offsetLng);
        },
        [onMarkerClick],
    );

    return (
        <>
            {events.map((event, i) => {
                const [lng, lat] = event.location.coordinates;
                const offsetLat = lat + i * 0.0001;
                const offsetLng = lng + i * 0.0001;
                const position = { lat: offsetLat, lng: offsetLng };

                const isSelected = selectedEventId === event._id;

                return (
                    <AdvancedMarker
                        key={event._id}
                        position={position}
                        onClick={() => handleMarkerClick(event, offsetLat, offsetLng)}
                        title={event.name}
                    >
                        <Pin
                            background={isSelected ? COLORS.yellow : COLORS.darkBlue}
                            borderColor={COLORS.black}
                            glyphColor={isSelected ? COLORS.black : COLORS.white}
                        />
                    </AdvancedMarker>
                );
            })}
        </>
    );
};
