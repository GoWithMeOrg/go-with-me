"use client";

import { FC, HTMLAttributes, useCallback, useEffect, useState } from "react";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";
import Spinner from "@/assets/icons/spinner.svg";

import { useComments } from "./hooks";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";

import { ICommentData, ReplyTo } from "./types";

import classes from "./CommentsList.module.css";

interface CommentsListProps {
    event_id: string;
}

const MessageContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <section className={classes.container}>
        <div className={`${classes.messageContainer} ${className ?? ""}`} {...rest}>
            {children}
        </div>
    </section>
);

export const CommentsList: FC<CommentsListProps> = ({ event_id }) => {
    const [limit, setLimit] = useState<number>(5);
    const { data, error, refetch, saveComment, likeComment, deleteComment, author_id } = useComments({
        event_id,
        limit,
    });

    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);
    const [parentIdState, setParentIdState] = useState<string | null>(null);
    const [comments, setComments] = useState<ICommentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (data) {
            setComments(data.comments);
            setLoading(false);
        }
    }, [data]);
    //console.log(data?.comments.length === 0);
    const onSaveComment = useCallback(
        async ({ content, replyTo, parentId }: { content: string; replyTo?: ReplyTo; parentId?: string }) => {
            const saveCommentResponse = await saveComment({
                variables: { comment: { event_id, author_id, content, replyTo, parentId } },
            });
            if (!saveCommentResponse) return;
            refetch();
            setReplyToState(null);
            setParentIdState(null);
            return saveCommentResponse;
        },
        [event_id, refetch, saveComment, author_id],
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

    const onClickLikeButton = async ({ commentId }: { commentId: string }) => {
        setLoading(true);
        await likeComment({
            variables: {
                userId: author_id,
                commentId,
            },
        });
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
        onSaveComment({ content, replyTo: replyToState ?? undefined, parentId: parentIdState ?? undefined });
    console.log("Comments length:", comments.length);
    return (
        <section className={classes.container}>
            <Title tag="h3" className={classes.title}>
                Comments
            </Title>
            <CommentForm onSaveComment={onSaveCommentTop} />
            <ul className={classes.commentsList}>
                {comments.map((comment) => {
                    const { _id, replies, likes, author } = comment;
                    const commentId = _id.toString();
                    return (
                        <li key={commentId}>
                            <Comment
                                comment={comment}
                                onClickReplyButton={onClickReplyButton}
                                onClickLikeButton={onClickLikeButton}
                                onClickDeleteButton={onClickDeleteButton}
                                isLiked={Boolean(likes.find((id) => id === author_id))}
                                isDeletable={author._id === author_id}
                            />
                            {replyToState?.id === commentId ? <CommentForm onSaveComment={onSaveCommentReply} /> : null}
                            {replies ? (
                                <ul className={classes.replies}>
                                    {replies.map((replyComment) => {
                                        const { likes, author } = replyComment;
                                        const replyCommentId = replyComment._id.toString();
                                        return (
                                            <li key={replyCommentId}>
                                                <Comment
                                                    comment={replyComment}
                                                    onClickReplyButton={onClickReplyButton}
                                                    onClickLikeButton={onClickLikeButton}
                                                    onClickDeleteButton={onClickDeleteButton}
                                                    isLiked={Boolean(likes.find((id) => id === author_id))}
                                                    isDeletable={author._id === author_id}
                                                />
                                                {replyToState?.id === replyCommentId ? (
                                                    <CommentForm onSaveComment={onSaveCommentReply} />
                                                ) : null}
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : null}
                        </li>
                    );
                })}
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
                    Load more comments
                </Button>
            )}
        </section>
    );
};
