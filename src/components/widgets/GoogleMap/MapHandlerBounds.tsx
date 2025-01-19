import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef } from "react";

interface Props {
    place: google.maps.places.PlaceResult | null;
}

export const MapHandlerBounds = ({ place }: Props) => {
    const map = useMap();
    const rectangleRef = useRef<google.maps.Rectangle | null>(null);

    const normalizeViewport = (viewport: any) => {
        return {
            north: viewport.ei?.hi,
            south: viewport.ei?.lo,
            east: viewport.Hh?.hi,
            west: viewport.Hh?.lo,
        };
    };

    useEffect(() => {
        if (!map || !place) return;

        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
            const viewport = normalizeViewport(place?.geometry?.viewport);
            if (
                viewport.north !== undefined &&
                viewport.south !== undefined &&
                viewport.east !== undefined &&
                viewport.west !== undefined
            ) {
                const latLngBounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(viewport.south, viewport.west),
                    new google.maps.LatLng(viewport.north, viewport.east),
                );

                if (map && rectangleRef?.current) {
                    map?.fitBounds(latLngBounds);
                    rectangleRef.current.setMap(null);
                }

                rectangleRef.current = new google.maps.Rectangle({
                    bounds: latLngBounds,
                    map: map,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.2,
                });
            } else {
                console.error("Viewport normalization failed.");
            }
        }
    }, [map, place]);

    return null;
};

export default React.memo(MapHandlerBounds);
