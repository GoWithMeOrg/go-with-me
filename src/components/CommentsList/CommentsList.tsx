"use client";

import { FC, Fragment } from "react";
import { Comment, ICommentProps } from "../Comment";
import { Button } from "../Button";

import styles from "./CommentsList.module.css";

interface CommentsListProps {
    comments: ICommentProps[];
}

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
    console.log("comments", comments);
    return (
        <section className={`mainContainer ${styles.container}`}>
            <h3 className={styles.title}>Comments</h3>
            <ul>
                {comments.map((comment) => {
                    const { _id, replies } = comment;
                    return (
                        <Fragment key={_id}>
                            <Comment {...{ ...comment, likesNumber: 999, replyToId: null }} />
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
            <Button>Load more comments</Button>
        </section>
    );
};
