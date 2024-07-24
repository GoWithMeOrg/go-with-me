"use client";

import { FC, Fragment } from "react";
import { Comment, ICommentProps } from "../Comment";

import styles from "./CommentsList.module.css";

interface CommentsListProps {
    comments: ICommentProps[];
}

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
    return (
        <section className={styles.comments}>
            <h3 className={styles.title}>Comments</h3>
            <ul>
                {comments.map((comment) => {
                    const { _id, replies } = comment;
                    return (
                        <Fragment key={_id}>
                            <Comment {...{ ...comment, likesNumber: 999, replyToId: "999" }} />
                            {replies ? (
                                <ul className={styles.replies}>
                                    {replies.map((comment) => {
                                        const { _id } = comment;
                                        return (
                                            <Fragment key={_id}>
                                                <Comment {...{ ...comment, likesNumber: 999, replyToId: "999" }} />
                                            </Fragment>
                                        );
                                    })}
                                </ul>
                            ) : null}
                        </Fragment>
                    );
                })}
            </ul>
        </section>
    );
};
