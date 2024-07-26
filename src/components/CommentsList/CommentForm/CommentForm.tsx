"use client";

import { FC } from "react";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { SubmitHandler, useController, useForm } from "react-hook-form";

import styles from "./CommentForm.module.css";

interface Inputs {
    comment: string;
}

export const CommentForm: FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>();

    const {
        field: { onChange, onBlur, value, name },
    } = useController({ name: "comment", control, rules: { required: "Please write a comment" } });

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data.comment);
    console.log(errors);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label>
                <Textarea
                    {...{
                        rows: 8,
                        resizeNone: true,
                        placeholder: "Text of your comment ...",
                    }}
                    {...{ onChange, onBlur, value, name }}
                ></Textarea>
            </label>
            <Button disabled={errors.comment ? true : false}>Comment</Button>
        </form>
    );
};
