'use client';

import { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Comment as CommentType, OwnerType } from '@/app/graphql/types';
import Spinner from '@/assets/icons/spinner.svg';
import { Button } from '@/components/shared/Button';
import { Title } from '@/components/shared/Title';

import { Comment } from './Comment';
import { useComment } from './Comment/hooks/useComment';
import { CommentForm } from './CommentForm';
import { useComments } from './hooks';
import { ICommentData, ReplyTo } from './types';

import classes from './CommentsList.module.css';

interface CommentsListProps {
    event_id: string;
}

const MessageContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <section className={classes.container}>
        <div className={`${classes.messageContainer} ${className ?? ''}`} {...rest}>
            {children}
        </div>
    </section>
);

export const CommentsList: FC<CommentsListProps> = ({ event_id }) => {
    const [limit, setLimit] = useState<number>(5);
    const { data, error, refetch } = useComments({
        event_id,
        limit,
    });

    const { onSaveComment, loading, setLoading } = useComment({ owner_id: event_id });

    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);
    const [parentIdState, setParentIdState] = useState<string | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);

    useEffect(() => {
        if (data?.getCommentsByOwnerId) {
            setComments(data?.getCommentsByOwnerId);
        }
        setLoading(false);
    }, [data]);

    if (error) return <MessageContainer>Error: {error.message}</MessageContainer>;

    const onClickReplyButton = ({ replyTo, parentId }: { replyTo: ReplyTo; parentId: string }) => {
        if (replyToState?.id === replyTo.id) {
            setReplyToState(null);
            setParentIdState(null);
        } else {
            setReplyToState(replyTo);
            setParentIdState(parentId);
        }
    };

    const onClickLoadMore = async () => {
        setLimit((state) => state + 5);
        setLoading(true);
        await refetch();
    };

    // const onSaveCommentReply = (content: string) => saveComment(content, replyToState ?? undefined);

    // Рекурсивная функция для отрисовки комментариев и вложений
    const renderComment = (comment: CommentType, level: number = 0) => {
        const { _id, parent } = comment;
        const commentId = _id.toString();

        return (
            <li key={commentId} className={level > 0 ? classes.nestedComment : ''}>
                <Comment comment={comment} onClickReplyButton={onClickReplyButton} />
                {replyToState?.id === commentId ? (
                    <CommentForm onSaveComment={onSaveCommentReply} />
                ) : null}
                {/* {replies && replies.length > 0 && (
                    <ul className={classes.replies}>
                        {replies.map((replyComment) => renderComment(replyComment, level + 1))}
                    </ul>
                )} */}
            </li>
        );
    };

    return (
        <section className={classes.container}>
            <Title tag="h3" className={classes.title}>
                Комментарии
            </Title>
            <CommentForm onSaveComment={onSaveComment} />
            <ul className={classes.commentsList}>
                {comments?.map((comment) => renderComment(comment))}
            </ul>
            {loading && (
                <MessageContainer>
                    <Spinner />
                </MessageContainer>
            )}

            {comments.length >= limit && (
                <Button
                    className={classes.loadButton}
                    disabled={loading || comments.length < limit}
                    onClick={onClickLoadMore}
                >
                    Больше комментариев
                </Button>
            )}
        </section>
    );
};
