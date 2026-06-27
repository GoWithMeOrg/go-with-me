import { useMemo } from 'react';
import { DateTime } from '@/components/shared/DateTime/DateTime';
import { Location } from '@/components/shared/Location/Location';
import Link from 'next/link';

import { SIZE_CLASS_MAP } from '../ImageCover/constants';
import { ImageCover } from '../ImageCover/ImageCover';
import { CardEventProps, SizeCard } from './types';

import classes from './CardEvent.module.css';

export { SizeCard };

export const CardEvent = ({
    id,
    name,
    description,
    coord,
    startDate,
    time,
    image,
    size,
    slideRef,
    priority,
}: CardEventProps) => {
    const cardCssString = useMemo(
        () => [classes.card, SIZE_CLASS_MAP[size]].filter(Boolean).join(' '),
        [size]
    );

    return (
        <div id={id} className={cardCssString} ref={slideRef}>
            <ImageCover id={id} image={image} name={name} size={size} priority={priority} />

            <div>
                <Location coord={coord} />

                <DateTime startDate={startDate} time={time} />
            </div>

            <div className={classes.descriptionWrapper}>
                <Link href={`/events/${id}`} className={classes.titleLink}>
                    <h3 className={classes.title}>{name}</h3>
                </Link>

                <p className={classes.description}>{description}</p>
            </div>
        </div>
    );
};

export default CardEvent;
