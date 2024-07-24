"use client";

import { FC, useCallback, useMemo } from "react";

import type { IComment } from "@/database/models/Comment";
import { formatDate } from "@/utils/formatDate";

import classes from "./Comments.module.css";
import { CommentsList } from "../CommentsList";
import { ICommentProps } from "../Comment/Comment";

type CommentsProps = {
    comments: IComment[];
    onSave: (commentContent: string) => void;
};

const Comments: FC<CommentsProps> = ({ comments, onSave }) => {
    const handleSaveComment = (event: any) => {
        event.preventDefault();
        onSave(event.target.content.value);
    };

    const commentsParsed: ICommentProps[] = useMemo(() => {
        const highLevelComments: ICommentProps[] = [];
        const dict: { [key: string]: ICommentProps } = {};
        comments.forEach((item) => {
            const { _id, replyToId } = item;
            dict[_id] = item;
            if (replyToId === null) highLevelComments.push(dict[_id]);
        });
        Object.keys(dict).forEach((item) => {
            const current = dict[item];
            const { replyToId } = current;
            if (replyToId) {
                const parrent = dict[replyToId];
                if (!parrent.replies) parrent.replies = [];
                parrent.replies.push(current);
            }
        });
        return highLevelComments;
    }, [comments]);

    return (
        <>
            <div className={classes.container}>
                <section>
                    <h6>Написать комментарий</h6>
                    <form onSubmit={handleSaveComment}>
                        <textarea
                            rows={6}
                            name="content"
                            placeholder="Введите комментарий"
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
            <CommentsList {...{ comments: commentsParsed }} />
        </>
    );
};

export { Comments };
