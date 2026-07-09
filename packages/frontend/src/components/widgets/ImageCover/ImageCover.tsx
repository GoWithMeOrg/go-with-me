import Image from 'next/image';
import Link from 'next/link';

import { useImageCover } from './hooks/useImageCover';
import { CardEventCoverProps } from './types';

import classes from './ImageCover.module.css';

export const ImageCover = ({ id, image, name, priority }: CardEventCoverProps) => {
    const { showImage, setImgError } = useImageCover({ image });

    return (
        <Link href={`/events/${id}`} className={classes.link} aria-label={name}>
            {showImage ? (
                <Image
                    src={image || ''}
                    alt={name}
                    fill
                    className={classes.image}
                    onError={() => setImgError(true)}
                    priority={priority}
                    sizes="(max-width: 22.5rem) 100vw, (max-width: 48rem) 50vw, 25vw"
                />
            ) : (
                <div className={classes.placeholder} />
            )}
        </Link>
    );
};
