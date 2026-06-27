import Image from 'next/image';
import Link from 'next/link';

import { useImageCover } from './hooks/useImageCover';
import { CardEventCoverProps } from './types';

import classes from './ImageCover.module.css';

export const ImageCover = ({ id, image, name, size, priority }: CardEventCoverProps) => {
    const { showImage, setImgError, dimensions } = useImageCover({ image, size });

    return (
        <Link
            href={`/events/${id}`}
            className={classes.link}
            aria-label={name}
            style={{ aspectRatio: `${dimensions.width} / ${dimensions.height}` }}
        >
            {showImage ? (
                <Image
                    src={image as string}
                    alt={name}
                    fill
                    className={classes.image}
                    onError={() => setImgError(true)}
                    priority={priority}
                    sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 25vw"
                />
            ) : (
                <div className={classes.placeholder} />
            )}
        </Link>
    );
};
