"use client";

import { useEffect, useState, FC, ChangeEvent } from "react";
import type { IComment } from "@/database/models/Comment";
import classes from "@/components/Comments/Comments.module.css";
import { formatDate } from "@/utils/formatDate";

type CommentsProps = {
    event_id: string;
};

const saveComment = (event_id: string, content: string) => {
    return fetch(`/api/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, event_id }),
    });
};

const getComments = async (event_id: string) => {
    try {
        const response = await fetch(`/api/comments?event_id=${event_id}`);
        const response_1 = await response.json();
        return response_1.data;
    } catch (error) {
        console.error(error);
    }
};

const Comments: FC<CommentsProps> = ({ event_id }) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [commentContent, setCommentContent] = useState("");

    const handleInputCommentContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentContent(event.target.value);
    };

    useEffect(() => {
        getComments(event_id).then((comments) => {
            setComments(comments);
        });
    }, [event_id]);

    const handleSaveComment = (event: any) => {
        event.preventDefault();
        saveComment(event_id, commentContent).then(() => {
            getComments(event_id).then((comments) => {
                setComments(comments);
            });
        });
    };

    return (
        <div className={classes.container}>
            <section>
                <h6>Написать комментарий</h6>
                <form action="/api/comments" onSubmit={handleSaveComment}>
                    <textarea
                        rows={6}
                        name="content"
                        placeholder="Введите комментарий"
                        onInput={handleInputCommentContent}
                        className={classes.textarea}
                    />
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
