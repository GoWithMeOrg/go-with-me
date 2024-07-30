"use client";

import { FC } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { usePageActionsContext } from "@/app/events/[event_id]/hooks";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";

import styles from "./CommentForm.module.css";
import { usePageStateContext } from "@/app/events/[event_id]/hooks/usePageStateContext";

interface Inputs {
    comment: string;
}

export const CommentForm: FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<Inputs>({ defaultValues: { comment: "" } });

    const {
        field: { onChange, onBlur, value, name },
    } = useController({ name: "comment", control, rules: { required: "Please write a comment" } });

    const { handleSaveComment } = usePageActionsContext();
    const { refetch } = usePageStateContext();

    const onSubmit: SubmitHandler<Inputs> = async ({ comment }) => {
        if (!handleSaveComment) return;
        try {
            const res = await handleSaveComment(comment);
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
