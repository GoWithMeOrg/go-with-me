import { Comment as CommentType } from '@/app/graphql/types';
import { CommentForm } from '@/components/widgets/Comments/CommentForm';

import { CommentActions } from './CommentActions';

import classes from './Comment.module.css';

interface CommentContentProps {
    comment: CommentType;
    userId: string;
    initialIsLiked?: boolean;
    initialLikesCount?: number;
    showReplyForm: boolean;
    onReply: () => void;
    onDelete: () => void;
    onSaveReply: (content: string) => Promise<any>;
    onCloseReplyForm: () => void;
}

export const CommentContent = ({
    comment,
    userId,
    initialIsLiked,
    initialLikesCount,
    showReplyForm,
    onReply,
    onDelete,
    onSaveReply,
    onCloseReplyForm,
}: CommentContentProps) => {
    if (comment.deleted) {
        return (
            <div className={classes.deletedComment}>
                <span>Комментарий удалён</span>
            </div>
        );
    }

    return (
        <>
            <p className={classes.commentText}>{comment.content}</p>
            <CommentActions
                commentId={comment._id}
                authorId={comment.author._id}
                userId={userId}
                initialIsLiked={initialIsLiked}
                initialLikesCount={initialLikesCount}
                onReply={onReply}
                onDelete={onDelete}
            />
            {showReplyForm && (
                <CommentForm onSaveComment={onSaveReply} onClose={onCloseReplyForm} />
            )}
        </>
    );
};
