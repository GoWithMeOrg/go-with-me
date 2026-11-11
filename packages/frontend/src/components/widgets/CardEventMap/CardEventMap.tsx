import Link from 'next/link';

import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import CardEvent, { SizeCard } from '../CardEvent/CardEvent';
import type { IEvent } from '../GoogleMap/types/Type';

import classes from './CardEventMap.module.css';

interface CardEventMapProp {
    selectedEvent: IEvent;
}

export function CardEventMap({ selectedEvent }: CardEventMapProp) {
    const { _id, description, image, location, name, startDate, time } = selectedEvent;

    return (
        <div className={classes.wrapperCard}>
            <CardEvent
                id={_id}
                coord={[
                    location?.geometry.coordinates[0] ?? 0,
                    location?.geometry.coordinates[1] ?? 0,
                ]}
                name={name}
                description={description ?? ''}
                image={image ?? undefined}
                time={time ?? undefined}
                startDate={startDate}
                size={SizeCard.ML}
            />
            <Link href={`/events/${_id}`} className={classes.linkEvent}>
                <span className={classes.linkText}>To event</span>
                <ArrowCircle />
            </Link>
        </div>
    );
}
