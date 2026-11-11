import React, { useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@apollo/client/react';
import { useMap } from '@vis.gl/react-google-maps';
import gql from 'graphql-tag';

import { PlaceType } from '@/components/widgets/MapComponents/types/types';

interface Props {
    place: PlaceType;
}

type Bounds = {
    south: number;
    west: number;
    north: number;
    east: number;
};

const GET_EVENTS_BY_LOCATION = gql`
    query GetEventsByLocation($bounds: Bounds!) {
        eventSearchByLocation(bounds: $bounds) {
            name
            location {
                properties {
                    address
                }
                coordinates
            }
        }
    }
`;

const normalizeViewport = (viewport: google.maps.LatLngBounds): Bounds => ({
    south: viewport.getSouthWest().lat(),
    west: viewport.getSouthWest().lng(),
    north: viewport.getNorthEast().lat(),
    east: viewport.getNorthEast().lng(),
});

export const MapHandlerBounds = ({ place }: Props) => {
    const map = useMap();
    const rectangleRef = useRef<google.maps.Rectangle | null>(null);

    const bounds = useMemo<Bounds | null>(
        () => (place?.viewport ? normalizeViewport(place.viewport) : null),
        [place]
    );

    useQuery(GET_EVENTS_BY_LOCATION, {
        variables: { bounds },
        skip: !bounds,
    });

    useEffect(() => {
        if (!map || !place?.viewport || !bounds) return;

        map.fitBounds(place.viewport);

        const latLngBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(bounds.south, bounds.west),
            new google.maps.LatLng(bounds.north, bounds.east)
        );

        if (rectangleRef.current) {
            map.fitBounds(latLngBounds);
            rectangleRef.current.setMap(null);
        }

        rectangleRef.current = new google.maps.Rectangle({
            bounds: latLngBounds,
            map: map,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.2,
        });
    }, [map, place, bounds]);

    return null;
};

export default React.memo(MapHandlerBounds);
