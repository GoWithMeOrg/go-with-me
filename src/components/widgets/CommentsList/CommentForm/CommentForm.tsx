"use client";

import { FC } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { FetchResult } from "@apollo/client";

import { Button } from "@/components/shared/Button";
import { Textarea } from "@/components/shared/Textarea";

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
                    error={Boolean(errors.comment)}
                    placeholder="Твой комментарий ..."
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                ></Textarea>
            </label>
            <Button disabled={errors.comment ? true : false}>Комментировать</Button>
        </form>
    );
};
