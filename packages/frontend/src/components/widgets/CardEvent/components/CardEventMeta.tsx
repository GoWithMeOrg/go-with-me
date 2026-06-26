import Clock from '@/assets/icons/clock.svg';
import Marker from '@/assets/icons/marker.svg';
import { Geocoding } from '@/components/widgets/GoogleMap/Geocoding';
import dayjs from 'dayjs';

import classes from '../CardEvent.module.css';

interface CardEventMetaProps {
    coord?: [number, number];
    startDate: string | Date | undefined;
    time: string | undefined;
}

export const CardEventMeta = ({ coord, startDate, time }: CardEventMetaProps) => (
    <div className={classes.details}>
        <div>
            <Marker className={classes.icon} />
            {coord && <Geocoding coordinates={coord} />}
        </div>

        <div>
            <Clock className={classes.icon} />
            {startDate && dayjs(startDate).format('DD.MM.YYYY')} {time && `| ${time}`}
        </div>
    </div>
);
