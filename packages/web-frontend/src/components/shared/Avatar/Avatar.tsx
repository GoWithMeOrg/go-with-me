import { FC, HTMLAttributes } from 'react';
import type { IUser } from '@/app/types/User';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { getContent } from './helpers';

import classes from './Avatar.module.css';

//@ts-ignore
interface AvatarProps extends HTMLAttributes<HTMLDivElement>, Pick<IUser, 'name'> {
    scale?: number;
    image?: string;
    className?: string;
    id: string;
}

export const Avatar: FC<AvatarProps> = ({ image, name, scale = 1, className, id }) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (id) {
            router.push(`/profile/${id}/public`);
        }
    };

    return (
        <div style={{ width: `calc(${scale} * 3.5rem)` }} onClick={handleClick}>
            <div
                className={[classes.avatar, !image && classes.background, className]
                    .filter(Boolean)
                    .join(' ')}
            >
                {image ? (
                    <Image
                        className={classes.image}
                        alt={name as string}
                        src={image as string}
                        fill
                        sizes={`calc(${scale} * 3.5rem)`}
                    ></Image>
                ) : (
                    <p className={classes.content} style={{ fontSize: `calc(${scale} * 1rem)` }}>
                        {getContent(name as string)}
                    </p>
                )}
            </div>
        </div>
    );
};
