import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef } from "react";
import { IEvent } from "./types/Type";

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

                if (currentZoom && currentZoom < 12) {
                    mapRef.current.setZoom(14);
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
                            background={isSelected ? "#FFD600" : "#091757"}
                            borderColor={"#091757"}
                            glyphColor={isSelected ? "#000" : "#fff"}
                        />
                    </AdvancedMarker>
                );
            })}
        </>
    );
};
