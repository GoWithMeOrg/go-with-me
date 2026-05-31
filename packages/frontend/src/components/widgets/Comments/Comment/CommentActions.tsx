import ArrowReply from '@/assets/icons/arrowReply.svg';
import Trash from '@/assets/icons/trash.svg';
import { Like } from '@/components/widgets/Like';

import classes from './Comment.module.css';

interface CommentActionsProps {
    commentId: string;
    authorId: string;
    userId: string;
    initialIsLiked?: boolean;
    initialLikesCount?: number;
    onReply: () => void;
    onDelete: () => void;
}

export const CommentActions = ({
    commentId,
    authorId,
    userId,
    initialIsLiked,
    initialLikesCount,
    onReply,
    onDelete,
}: CommentActionsProps) => (
    <div className={classes.likesContainer}>
        <Like
            owner_id={commentId}
            ownerType="Comment"
            count
            initialIsLiked={initialIsLiked}
            initialLikesCount={initialLikesCount}
        />
        {userId !== authorId && (
            <button className={classes.replyButton} onClick={onReply}>
                <ArrowReply />
            </button>
        )}
        {userId === authorId && (
            <button className={classes.deleteButton} onClick={onDelete}>
                <Trash />
            </button>
        )}
    </div>
);
