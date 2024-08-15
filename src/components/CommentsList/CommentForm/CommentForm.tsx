"use client";

import { FC } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { FetchResult } from "@apollo/client";

import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";

import classes from "./CommentForm.module.css";

interface CommentFormProps {
    onSaveComment: (content: string) => Promise<FetchResult<any> | undefined>;
}

interface Inputs {
    comment: string;
}

export const CommentForm: FC<CommentFormProps> = ({ onSaveComment }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<Inputs>({ defaultValues: { comment: "" } });

    const {
        field: { onChange, onBlur, value, name },
    } = useController({ name: "comment", control, rules: { required: "Please write a comment" } });

    const onSubmit: SubmitHandler<Inputs> = async ({ comment }) => {
        try {
            const saveCommentResponse = await onSaveComment(comment);
            if (!saveCommentResponse) return;
            console.log("EventPage: ", saveCommentResponse);
            reset();
        } catch (error) {
            console.error("EventPage: ", error);
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <label>
                <Textarea
                    rows={8}
                    resizeNone={true}
                    error={errors.comment ? true : false}
                    placeholder="Text of your comment ..."
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                ></Textarea>
            </label>
            <Button disabled={errors.comment ? true : false}>Comment</Button>
        </form>
    );
};
