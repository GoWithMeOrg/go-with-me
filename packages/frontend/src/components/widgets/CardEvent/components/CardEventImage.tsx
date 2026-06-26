import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IMAGE_SIZES, ImageSizeKey } from '../constants';

import classes from '../CardEvent.module.css';

interface CardEventImageProps {
    id: string;
    image?: string;
    name: string;
    size: ImageSizeKey;
    priority?: boolean;
}

export const CardEventImage = ({ id, image, name, size, priority }: CardEventImageProps) => {
    const [imgError, setImgError] = useState(false);

    const showImage = image && !imgError;

    return (
        <Link href={`/events/${id}`} className={classes.imageLink} aria-label={name}>
            {showImage ? (
                <Image
                    src={image}
                    alt={name}
                    width={IMAGE_SIZES[size].width}
                    height={IMAGE_SIZES[size].height}
                    className={classes.image}
                    onError={() => setImgError(true)}
                    priority={priority}
                    sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 25vw"
                />
            ) : (
                <div className={classes.imagePlaceholder} />
            )}
        </Link>
    );
};
