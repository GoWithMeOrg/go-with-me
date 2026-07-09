import { Event } from '@/app/graphql/types';
import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import Link from 'next/link';

import CardEvent from '../CardEvent/CardEvent';

import classes from './CardEventMap.module.css';

interface CardEventMapProp {
    selectedEvent: Event;
}

export function CardEventMap({ selectedEvent }: CardEventMapProp) {
    const { _id, description, image, location, name, startDate, time } = selectedEvent;

    return (
        <div className={classes.wrapperCard}>
            <CardEvent
                id={_id}
                coord={location?.geometry.coordinates}
                name={name}
                description={description as string}
                image={image as string}
                time={time as string}
                startDate={startDate as string}
            />
            <Link href={`/events/${_id}`} className={classes.linkEvent}>
                <span className={classes.linkText}>To event</span>
                <ArrowCircle />
            </Link>
        </div>
    );
}
