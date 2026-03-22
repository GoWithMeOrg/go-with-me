import React from 'react';
import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';

import classes from '@/components/widgets/LocationPicker/LocationPicker.module.css';

type CustomAutocompleteControlProps = {
    controlPosition: ControlPosition;
    children: React.ReactNode;
};

const AutocompleteControl = ({ controlPosition, children }: CustomAutocompleteControlProps) => {
    return (
        <MapControl position={controlPosition}>
            <div className={classes.autocompleteControl}>{children}</div>
        </MapControl>
    );
};

export default React.memo(AutocompleteControl);
