import { FC } from 'react';

import { Label } from '@/components/shared/Label';
import { Autocomplete } from '@/components/widgets/MapComponents/Autocomplete/Autocomplete';
import type { PlaceType } from '@/components/widgets/MapComponents/types/types';

import classes from './FilteredEventsLocation.module.css';

export interface FilteredEventsLocationProps {
    onChange: (place: PlaceType) => void;
}

export const FilteredEventsLocation: FC<FilteredEventsLocationProps> = ({ onChange }) => {
    return (
        <div className={classes.location}>
            <Label label={'Место'} />

            <Autocomplete onPlaceSelect={onChange} />
        </div>
    );
};

export default FilteredEventsLocation;
