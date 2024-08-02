"use client";

import { FC, useCallback, useState } from "react";
import { ApolloQueryResult, gql, OperationVariables, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { Comment } from "./Comment";
import { Button } from "../Button";
import { CommentForm } from "./CommentForm";

import { ICommentProps } from "./styles";

import styles from "./CommentsList.module.css";

interface CommentsListProps {
    comments: ICommentProps[];
    event_id: string;
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
}

const SAVE_COMMENT = gql`
    #graphql
    mutation SaveComment($comment: CommentInput!) {
        saveComment(comment: $comment) {
            _id
            author {
                _id
                name
                email
            }
            content
            createdAt
            updatedAt
        }
    }
`;

export const CommentsList: FC<CommentsListProps> = ({ comments, event_id, refetch }) => {
    const session = useSession();
    const [saveComment] = useMutation(SAVE_COMMENT);

    const [replyIdState, setReplyIdState] = useState<string | null>(null);

    const onClickReplyButton = ({ _id }: { _id: string }) => {
        if (replyIdState === _id) {
            setReplyIdState(null);
        } else {
            setReplyIdState(_id);
        }
    };

    const onSaveComment = useCallback(
        async ({ content, replyToId }: { content: string; replyToId: string | null }) => {
            const res = await saveComment({
                variables: {
                    comment: {
                        event_id,
                        // @ts-ignore TODO: fix type
                        author_id: session.data?.user?.id,
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
        [event_id, refetch, saveComment, session],
    );

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
