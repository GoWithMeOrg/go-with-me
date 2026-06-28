import { CardDescription } from '@/components/shared/CardDescription/CardDescription';
import { DateTime } from '@/components/shared/DateTime/DateTime';
import { Location } from '@/components/shared/Location/Location';
import { SIZE_CLASS_MAP } from '@/components/widgets/ImageCover/constants';
import { ImageCover } from '@/components/widgets/ImageCover/ImageCover';

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
    const cardCss = [classes.card, SIZE_CLASS_MAP[size]].filter(Boolean).join(' ');

    return (
        <div id={id} className={cardCss} ref={slideRef}>
            <ImageCover id={id} image={image} name={name} size={size} priority={priority} />

            <div>
                <Location coord={coord} />

                <DateTime startDate={startDate} time={time} />
            </div>

            <CardDescription id={id} name={name} description={description} />
        </div>
    );
};

export default CardEvent;
