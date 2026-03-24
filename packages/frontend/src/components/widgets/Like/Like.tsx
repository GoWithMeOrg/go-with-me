import { FC } from 'react';
import Heart from '@/assets/icons/heart.svg';
import { Button } from '@/components/shared/Button';
import useLike from '@/components/widgets/Like/hooks/useLike';
import { LikeProps } from '@/components/widgets/Like/interfaces/LikeProps';

import classes from './Like.module.css';

export const Like: FC<LikeProps> = ({ owner_id, ownerType }) => {
    const { handleLike, isLiked } = useLike({ owner_id, ownerType });
    return (
        <Button className={classes.like} onClick={handleLike}>
            <Heart className={isLiked ? classes.liked : ''} />
        </Button>
    );
};

export default Like;
