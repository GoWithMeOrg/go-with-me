"use client";

import { FC, Fragment, useContext, useMemo, useState } from "react";
import { Comment, ICommentProps } from "./Comment";
import { Button } from "../Button";
import { CommentForm } from "./CommentForm";
import { CommentsListContext, ICommentsListContext } from "./context";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

import styles from "./CommentsList.module.css";

interface CommentsListProps {
    comments: ICommentProps[];
    event_id: string;
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
}

export const CommentsList: FC<CommentsListProps> = ({ comments, event_id, refetch }) => {
    const [replyIdForm, setReplyIdForm] = useState<string | null>(null);

    const contextValue: ICommentsListContext = { event_id, refetch, replyIdForm, setReplyIdForm };

    return (
        <CommentsListContext.Provider value={contextValue}>
            <section className={`mainContainer ${styles.container}`}>
                <h3 className={styles.title}>Comments</h3>
                {!replyIdForm ? <CommentForm /> : null}
                <ul>
                    {comments.map((comment) => {
                        const { _id, replies } = comment;
                        return (
                            <Fragment key={_id}>
                                <Comment {...{ ...comment }} />
                                {replies ? (
                                    <ul className={styles.replies}>
                                        {replies.map((comment) => {
                                            return (
                                                <Fragment key={_id}>
                                                    <Comment {...{ ...comment }} />
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
        </CommentsListContext.Provider>
    );
};
