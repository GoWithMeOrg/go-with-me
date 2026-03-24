import { FC } from 'react';
import useJoin from '@/components/widgets/Join/hooks/useJoin';
import { JoinProps } from '@/components/widgets/Join/interfaces/JoinProps';

import classes from './Join.module.css';

export const Join: FC<JoinProps> = ({ owner_id }) => {
    const { joinedUsers } = useJoin({ owner_id });

    return (
        <div className={classes.join}>
            <div>{joinedUsers}</div>
            <span className={classes.joinText}>уже присоединились</span>
        </div>
    );
};

export default Join;
