"use client";

import { FC, useState } from "react";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Comment } from "./Comment";
import { Button } from "../Button";
import { CommentForm } from "./CommentForm";

import styles from "./CommentsList.module.css";
import { ICommentProps } from "./styles";

interface CommentsListProps {
    comments: ICommentProps[];
    event_id: string;
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
}

export const CommentsList: FC<CommentsListProps> = ({ comments, event_id, refetch }) => {
    const [replyIdState, setReplyIdState] = useState<string | null>(null);

    return (
        <section className={`mainContainer ${styles.container}`}>
            <h3 className={styles.title}>Comments</h3>
            <CommentForm {...{ event_id, refetch, replyIdState: null }} />
            <ul>
                {comments.map((comment) => {
                    const { _id, replies } = comment;
                    return (
                        <li key={_id}>
                            <Comment {...{ ...comment, replyIdState, setReplyIdState }} />
                            {replyIdState === _id ? <CommentForm {...{ event_id, refetch, replyIdState }} /> : null}
                            {replies ? (
                                <ul className={styles.replies}>
                                    {replies.map((comment) => {
                                        const { _id } = comment;
                                        return (
                                            <li key={_id}>
                                                <Comment {...{ ...comment, replyIdState, setReplyIdState }} />
                                                {replyIdState === _id ? (
                                                    <CommentForm {...{ event_id, refetch, replyIdState }} />
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
