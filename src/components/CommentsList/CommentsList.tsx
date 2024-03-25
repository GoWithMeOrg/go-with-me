"use client";

import { FC, Fragment } from "react";
import { Comment } from "../Comment";
import { IComment } from "../Comment/types";

import styles from "./CommentsList.module.css";

interface CommentWithReplies extends IComment {
    replies: IComment[];
}

interface CommentsListProps {
    comments: CommentWithReplies[];
}

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
    return (
        <section className={styles.comments}>
            <h3 className={styles.title}>Comments</h3>
            <ul>
                {comments.map(({ commentId, likesNumber, text, userName, replies, date }) => {
                    const replyToId = commentId;
                    return (
                        <Fragment key={commentId}>
                            <Comment {...{ commentId, userName, text, likesNumber, date }} />
                            <ul className={styles.replies}>
                                {replies.map(({ commentId, likesNumber, text, userName, date }) => {
                                    return (
                                        <Fragment key={commentId}>
                                            <Comment {...{ commentId, userName, text, likesNumber, replyToId, date }} />
                                        </Fragment>
                                    );
                                })}
                            </ul>
                        </Fragment>
                    );
                })}
            </ul>
        </section>
    );
};
