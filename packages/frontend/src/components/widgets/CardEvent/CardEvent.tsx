import { useMemo } from 'react';

import { CardEventDescription } from './components/CardEventDescription';
import { CardEventImage } from './components/CardEventImage';
import { CardEventMeta } from './components/CardEventMeta';
import { SIZE_CLASS_MAP } from './constants';
import { CardEventProps } from './types';

import classes from './CardEvent.module.css';

export { SizeCard } from './types';

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
            <CardEventImage id={id} image={image} name={name} size={size} priority={priority} />

            <CardEventMeta coord={coord} startDate={startDate} time={time} />

            <CardEventDescription id={id} name={name} description={description} />
        </div>
    );
};

export default CardEvent;
