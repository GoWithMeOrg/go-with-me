import React, { FC } from 'react';
import { Label } from '@/components/shared/Label';
import { optionsCities } from '@/components/widgets/GoogleMap/OptionsAutocomplete';
import { Autocomplete } from '@/components/widgets/MapComponents/Autocomplete/Autocomplete';

import classes from './FilteredEventsLocation.module.css';

export interface FilteredEventsLocationProps {
    options: google.maps.places.AutocompleteOptions;
    onChange: (...event: any[]) => void;
}

export const FilteredEventsLocation: FC<FilteredEventsLocationProps> = ({ options, onChange }) => {
    return (
        <div className={classes.location}>
            <Label label={'Место'} />

            <Autocomplete onPlaceSelect={onChange} />
        </div>
    );
};

export default FilteredEventsLocation;
