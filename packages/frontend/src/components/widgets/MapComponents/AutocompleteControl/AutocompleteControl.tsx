import React from 'react';
import { CustomAutocompleteControlProps } from '@/components/widgets/MapComponents/AutocompleteControl/types/CustomAutocompleteControlProps';
import { MapControl } from '@vis.gl/react-google-maps';

import classes from '@/components/widgets/LocationPicker/LocationPicker.module.css';

const AutocompleteControl = ({ controlPosition, children }: CustomAutocompleteControlProps) => {
    return (
        <MapControl position={controlPosition}>
            <div className={classes.autocompleteControl}>{children}</div>
        </MapControl>
    );
};

export default React.memo(AutocompleteControl);
