import { FC } from 'react';
import Heart from '@/assets/icons/heart.svg';
import { Button } from '@/components/shared/Button';
import useLike from '@/components/widgets/Like/hooks/useLike';
import { LikeProps } from '@/components/widgets/Like/interfaces/LikeProps';

import classes from './Like.module.css';

export const Like: FC<LikeProps> = ({ owner_id, ownerType, count, initialIsLiked, initialLikesCount }) => {
    const { handleLike, isLiked, likesCount } = useLike({ owner_id, ownerType, initialIsLiked, initialLikesCount });

    const likeCss = [classes.like, ownerType === 'Event' && classes.likeEvent]
        .filter(Boolean)
        .join(' ');

    const likedCss = [classes.liked, ownerType === 'Event' && classes.likedEvent]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes.likeContainer}>
            <Button className={likeCss} resetDefaultStyles onClick={handleLike}>
                <Heart className={isLiked ? likedCss : ''} />
            </Button>

            {count && likesCount !== undefined && likesCount > 0 && (
                <span className={classes.count}>{likesCount}</span>
            )}
        </div>
    );
};

export default Like;
