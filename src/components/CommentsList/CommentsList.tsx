"use client";

import { FC, HTMLAttributes, useCallback, useState } from "react";

import { useComments } from "./hooks";
import { Comment } from "./Comment";
import { Button } from "../Button";
import { CommentForm } from "./CommentForm";
import Spinner from "@/assets/icons/spinner.svg";
import { ReplyTo } from "./types";

import styles from "./CommentsList.module.css";

interface CommentsListProps {
    event_id: string;
}

const MessageContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <div className={`${styles.messageContainer} ${className ?? ""}`} {...rest}>
        {children}
    </div>
);

export const CommentsList: FC<CommentsListProps> = ({ event_id }) => {
    const { data, loading, error, refetch, saveComment, author_id } = useComments(event_id);

    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);
    const [parentIdState, setParentIdState] = useState<string | null>(null);

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

    if (loading)
        return (
            <MessageContainer>
                <Spinner />
            </MessageContainer>
        );
    if (error) return <MessageContainer>Error: {error.message}</MessageContainer>;
    if (!data) return <MessageContainer className={styles.error}>Comments error</MessageContainer>;
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

    const onSaveCommentTop = (content: string) => onSaveComment({ content });
    const onSaveCommentReply = (content: string) =>
        onSaveComment({ content, replyTo: replyToState ?? undefined, parentId: parentIdState ?? undefined });

    return (
        <section className={`mainContainer ${styles.container}`}>
            <h3 className={styles.title}>Comments</h3>
            <CommentForm {...{ onSaveComment: onSaveCommentTop }} />
            <ul>
                {comments.map((comment) => {
                    const { _id, replies } = comment;
                    const commentId = _id.toString();
                    return (
                        <li key={commentId}>
                            <Comment {...{ ...comment, onClickReplyButton }} />
                            {replyToState?.id === commentId ? (
                                <CommentForm {...{ onSaveComment: onSaveCommentReply }} />
                            ) : null}
                            {replies ? (
                                <ul className={styles.replies}>
                                    {replies.map((replyComment) => {
                                        const replyCommentId = replyComment._id.toString();
                                        return (
                                            <li key={replyCommentId}>
                                                <Comment {...{ ...replyComment, onClickReplyButton }} />
                                                {replyToState?.id === replyCommentId ? (
                                                    <CommentForm {...{ onSaveComment: onSaveCommentReply }} />
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
            <Button>Load more comments</Button>
        </section>
    );
};
