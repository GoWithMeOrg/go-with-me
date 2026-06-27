import Marker from '@/assets/icons/marker.svg';
import { Geocoding } from '@/components/widgets/GoogleMap/Geocoding';

import { LocationProps } from './types';

import classes from './Location.module.css';

export const Location = ({ coord }: LocationProps) => (
    <div className={classes.wrapper}>
        <Marker className={classes.icon} />
        <span className={classes.location}></span>
        {coord && <Geocoding coordinates={coord} />}
    </div>
);
