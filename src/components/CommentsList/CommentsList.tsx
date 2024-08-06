"use client";

import { FC, HTMLAttributes, useCallback, useState } from "react";
import { useComments } from "./hooks";
import { Comment } from "./Comment";
import { Button } from "../Button";
import { CommentForm } from "./CommentForm";
import Spinner from "@/assets/icons/spinner.svg";

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

    const [replyIdState, setReplyIdState] = useState<string | null>(null);

    const onSaveComment = useCallback(
        async ({ content, replyToId }: { content: string; replyToId: string | null }) => {
            const res = await saveComment({
                variables: {
                    comment: {
                        event_id,
                        author_id,
                        content,
                        replyToId,
                    },
                },
            });
            if (!res) return;
            refetch();
            setReplyIdState(null);
            return res;
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

    const onClickReplyButton = ({ _id }: { _id: string }) => {
        if (replyIdState === _id) {
            setReplyIdState(null);
        } else {
            setReplyIdState(_id);
        }
    };
    const onSaveCommentTop = (content: string) => onSaveComment({ content, replyToId: null });
    const onSaveCommentReply = (content: string) => onSaveComment({ content, replyToId: replyIdState });

    return (
        <section className={`mainContainer ${styles.container}`}>
            <h3 className={styles.title}>Comments</h3>
            <CommentForm {...{ onSaveComment: onSaveCommentTop }} />
            <ul>
                {comments.map((comment) => {
                    const { _id, replies } = comment;
                    return (
                        <li key={_id}>
                            <Comment {...{ ...comment, onClickReplyButton }} />
                            {replyIdState === _id ? <CommentForm {...{ onSaveComment: onSaveCommentReply }} /> : null}
                            {replies ? (
                                <ul className={styles.replies}>
                                    {replies.map((comment) => {
                                        const { _id } = comment;
                                        return (
                                            <li key={_id}>
                                                <Comment {...{ ...comment, onClickReplyButton }} />
                                                {replyIdState === _id ? (
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
