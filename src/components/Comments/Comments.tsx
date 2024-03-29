"use client";

import { FC } from "react";

import type { IComment } from "@/database/models/Comment";
import { formatDate } from "@/utils/formatDate";

import classes from "./Comments.module.css";

type CommentsProps = {
    comments: IComment[];
    onSave: (commentContent: string) => void;
};

const Comments: FC<CommentsProps> = ({ comments, onSave }) => {
    const handleSaveComment = (event: any) => {
        event.preventDefault();
        onSave(event.target.content.value);
    };

    return (
        <div className={classes.container}>
            <section>
                <h6>Написать комментарий</h6>
                <form onSubmit={handleSaveComment}>
                    <textarea rows={6} name="content" placeholder="Введите комментарий" className={classes.textarea} />
                    <input type="submit" value="Отправить" className={classes.btn} />
                </form>
            </section>

            <h6>Количество комметариев: {comments.length}</h6>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <p>
                            {comment.author?.name} at{" "}
                            <small>{formatDate(comment.createdAt, "dd LLLL yyyy hh:mm")}</small>
                        </p>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { Comments };
