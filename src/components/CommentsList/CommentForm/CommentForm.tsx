"use client";

import { FC, useContext } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { CommentsListContext } from "../context";

import styles from "./CommentForm.module.css";

interface Inputs {
    comment: string;
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

export const CommentForm: FC = () => {
    const session = useSession();
    const [saveComment] = useMutation(SAVE_COMMENT);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<Inputs>({ defaultValues: { comment: "" } });

    const {
        field: { onChange, onBlur, value, name },
    } = useController({ name: "comment", control, rules: { required: "Please write a comment" } });

    const commentsListContext = useContext(CommentsListContext);
    if (!commentsListContext) return null;
    const { replyIdForm, event_id, refetch } = commentsListContext;

    const onSubmit: SubmitHandler<Inputs> = async ({ comment }) => {
        try {
            const res = await saveComment({
                variables: {
                    comment: {
                        event_id,
                        // @ts-ignore TODO: fix type
                        author_id: session.data?.user?.id,
                        content: comment,
                        replyToId: replyIdForm ?? null,
                    },
                },
            });
            if (!res) return;
            console.log("EventPage: ", res);
            reset();
            refetch();
        } catch (error) {
            console.error("EventPage: ", error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label>
                <Textarea
                    {...{
                        rows: 8,
                        resizeNone: true,
                        error: errors.comment ? true : false,
                        placeholder: "Text of your comment ...",
                    }}
                    {...{ onChange, onBlur, value, name }}
                ></Textarea>
            </label>
            <Button disabled={errors.comment ? true : false}>Comment</Button>
        </form>
    );
};
