import React, { useEffect } from 'react';
import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

interface Props {
    place: google.maps.places.Place | null;
}

const AutocompleteResult = ({ place }: Props) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !place) return;
        if (place.viewport) map.fitBounds(place.viewport);
    }, [map, place]);

    if (!place) return null;

    return (
        <AdvancedMarker position={place.location}>
            <Pin background={'#FBBC04'} borderColor={'#1e89a1'} glyphColor={'#0f677a'} />
        </AdvancedMarker>
    );
};

export default React.memo(AutocompleteResult);
