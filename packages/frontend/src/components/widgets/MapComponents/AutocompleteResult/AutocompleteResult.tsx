import React, { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

import { AutocompleteResultProps } from './interfaces/AutocompleteResultProps';

const AutocompleteResult = ({ place }: AutocompleteResultProps) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !place) return;
        if (place.viewport) map.fitBounds(place.viewport);
    }, [map, place]);

    if (!place) return null;

    return null;

    // return (
    //     <AdvancedMarker position={place.location}>
    //         <Pin background={'#FBBC04'} borderColor={'#1e89a1'} glyphColor={'#0f677a'} />
    //     </AdvancedMarker>
    // );
};

export default React.memo(AutocompleteResult);
