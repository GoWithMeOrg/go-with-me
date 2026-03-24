import React, { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

interface Props {
    place: google.maps.places.Place | null;
}

export const MapHandler = ({ place }: Props) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !place) return;

        if (place?.viewport) {
            map.fitBounds(place?.viewport);
        }
    }, [map, place]);

    return null;
};

export default React.memo(MapHandler);
