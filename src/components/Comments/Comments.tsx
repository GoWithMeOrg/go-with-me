"use client";

import { useEffect, useState, FC, ChangeEvent } from "react";
import type { IComment } from "@/database/models/Comment";

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
        <div>
            <section>
                <h6>Написать комментарий</h6>
                <form action="/api/comments" onSubmit={handleSaveComment}>
                    <textarea
                        rows={6}
                        name="content"
                        placeholder="Введите комментарий"
                        onInput={handleInputCommentContent}
                    />
                    <input type="submit" value="Отправить" />
                </form>
            </section>

            <h6>Количество комметариев: {comments.length}</h6>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <p>
                            {comment.author?.name} at <small>{comment.createdAt.toString()}</small>
                        </p>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { Comments };
