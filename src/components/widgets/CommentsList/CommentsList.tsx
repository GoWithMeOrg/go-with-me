"use client";

import { FC, HTMLAttributes, useCallback, useState } from "react";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";
import Spinner from "@/assets/icons/spinner.svg";

import { useComments } from "./hooks";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";

import { ReplyTo } from "./types";

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
    const { data, loading, error, refetch, saveComment, likeComment, author_id, setLimit, limit } =
        useComments(event_id);

    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);
    const [parentIdState, setParentIdState] = useState<string | null>(null);
    const [isPaginationDisabled, setIsPaginationDisabled] = useState<boolean>(false);

    const onSaveComment = useCallback(
        async ({ content, replyTo, parentId }: { content: string; replyTo?: ReplyTo; parentId?: string }) => {
            const saveCommentResponse = await saveComment({
                variables: {
                    comment: {
                        event_id,
                        author_id,
                        content,
                        replyTo,
                        parentId,
                    },
                },
            });
            if (!saveCommentResponse) return;
            refetch();
            setReplyToState(null);
            setParentIdState(null);
            return saveCommentResponse;
        },
        [event_id, refetch, saveComment, author_id],
    );

    const OnLoadMoreComments = () => {
        setLimit((state) => state + 5);
        refetch();
        const commentsLength = data?.comments.length;
        console.log(commentsLength, limit);
        setIsPaginationDisabled(Boolean(commentsLength && commentsLength < limit));
    };

    if (loading)
        return (
            <MessageContainer>
                <Spinner />
            </MessageContainer>
        );
    if (error) return <MessageContainer>Error: {error.message}</MessageContainer>;
    if (!data) return <MessageContainer className={classes.error}>Comments error</MessageContainer>;
    const { comments } = data;

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
        const likeCommentResponse = await likeComment({
            variables: {
                userId: author_id,
                commentId,
            },
        });
        if (likeCommentResponse) refetch();
    };

    const onSaveCommentTop = (content: string) => onSaveComment({ content });
    const onSaveCommentReply = (content: string) =>
        onSaveComment({ content, replyTo: replyToState ?? undefined, parentId: parentIdState ?? undefined });

    return (
        <section className={classes.container}>
            <Title tag="h3" className={classes.title}>
                Comments
            </Title>
            <CommentForm onSaveComment={onSaveCommentTop} />
            <ul>
                {comments.map((comment) => {
                    const { _id, replies, likes } = comment;
                    const commentId = _id.toString();
                    return (
                        <li key={commentId}>
                            <Comment
                                comment={comment}
                                onClickReplyButton={onClickReplyButton}
                                onClickLikeButton={onClickLikeButton}
                                isLiked={Boolean(likes.find((id) => id === author_id))}
                            />
                            {replyToState?.id === commentId ? <CommentForm onSaveComment={onSaveCommentReply} /> : null}
                            {replies ? (
                                <ul className={classes.replies}>
                                    {replies.map((replyComment) => {
                                        const replyCommentId = replyComment._id.toString();
                                        return (
                                            <li key={replyCommentId}>
                                                <Comment
                                                    comment={replyComment}
                                                    onClickReplyButton={onClickReplyButton}
                                                    onClickLikeButton={onClickLikeButton}
                                                    isLiked={Boolean(likes.find((id) => id === author_id))}
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
            <Button disabled={isPaginationDisabled} onClick={OnLoadMoreComments}>
                Load more comments
            </Button>
        </section>
    );
};
