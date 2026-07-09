import { CardDescription } from '@/components/shared/CardDescription/CardDescription';
import { DateTime } from '@/components/shared/DateTime/DateTime';
import { Location } from '@/components/shared/Location/Location';
import { ImageCover } from '@/components/widgets/ImageCover/ImageCover';

import { CardEventProps } from './types';

import classes from './CardEvent.module.css';

export const CardEvent = ({
    id,
    name,
    description,
    coord,
    startDate,
    time,
    image,
    slideRef,
    priority,
}: CardEventProps) => {
    return (
        <div id={id} className={classes.card} ref={slideRef}>
            <ImageCover id={id} image={image} name={name} priority={priority} />

            <div>
                <Location coord={coord} />

                <DateTime startDate={startDate} time={time} />
            </div>

            <CardDescription id={id} name={name} description={description} />
        </div>
    );
};

export default CardEvent;
