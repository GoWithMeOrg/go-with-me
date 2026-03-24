import { FC } from 'react';
import Heart from '@/assets/icons/heart.svg';
import { Button } from '@/components/shared/Button';
import useLike from '@/components/widgets/Like/hooks/useLike';
import { LikeProps } from '@/components/widgets/Like/interfaces/LikeProps';

import classes from './Like.module.css';

export const Like: FC<LikeProps> = ({ event_id }) => {
    const { handleLike, isLiked } = useLike({ event_id });
    return (
        <Button className={classes.like} onClick={handleLike}>
            <Heart className={isLiked ? classes.liked : ''} />
        </Button>
    );
};

export default Like;
