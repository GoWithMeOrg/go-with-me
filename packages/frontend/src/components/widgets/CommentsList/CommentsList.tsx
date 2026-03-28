'use client';

import { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import Spinner from '@/assets/icons/spinner.svg';
import { Button } from '@/components/shared/Button';
import { Title } from '@/components/shared/Title';

import { Comment } from './Comment';
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
    const { data, error, refetch, saveComment, deleteComment, author_id } = useComments({
        event_id,
        limit,
    });

    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);
    const [parentIdState, setParentIdState] = useState<string | null>(null);
    const [comments, setComments] = useState<ICommentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (data?.getCommentsByOwnerId) {
            setComments(data?.getCommentsByOwnerId);
        }
        setLoading(false);
    }, [data]);

    const onSaveComment = useCallback(
        async ({
            content,
            replyTo,
            parentId,
        }: {
            content: string;
            replyTo?: ReplyTo;
            parentId?: string;
        }) => {
            setLoading(true);
            const saveCommentResponse = await saveComment({
                variables: { comment: { event_id, author_id, content, replyTo, parentId } },
            });
            if (!saveCommentResponse) {
                setLoading(false);
                return;
            }
            refetch();
            setReplyToState(null);
            setParentIdState(null);
            setLoading(false);
            return saveCommentResponse;
        },
        [event_id, refetch, saveComment, author_id]
    );

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

    const onClickDeleteButton = async ({ commentId }: { commentId: string }) => {
        setLoading(true);
        await deleteComment({
            variables: {
                userId: author_id,
                commentId,
            },
        });
        refetch();
    };

    const onClickLoadMore = async () => {
        setLimit((state) => state + 5);
        setLoading(true);
        await refetch();
    };

    const onSaveCommentTop = (content: string) => onSaveComment({ content });
    const onSaveCommentReply = (content: string) =>
        onSaveComment({
            content,
            replyTo: replyToState ?? undefined,
            parentId: parentIdState ?? undefined,
        });

    // Рекурсивная функция для отрисовки комментариев и вложений
    const renderComment = (comment: ICommentData, level: number = 0) => {
        const { _id, replies, likes, author } = comment;
        const commentId = _id.toString();

        return (
            <li key={commentId} className={level > 0 ? classes.nestedComment : ''}>
                <Comment
                    comment={comment}
                    onClickReplyButton={onClickReplyButton}
                    onClickDeleteButton={onClickDeleteButton}
                    isDeletable={(author._id as string) === author_id}
                />
                {replyToState?.id === commentId ? (
                    <CommentForm onSaveComment={onSaveCommentReply} />
                ) : null}
                {replies && replies.length > 0 && (
                    <ul className={classes.replies}>
                        {replies.map((replyComment) => renderComment(replyComment, level + 1))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <section className={classes.container}>
            <Title tag="h3" className={classes.title}>
                Комментарии
            </Title>
            <CommentForm onSaveComment={onSaveCommentTop} />
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
