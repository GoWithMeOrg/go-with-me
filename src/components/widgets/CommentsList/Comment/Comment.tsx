"use client";
import { FC, ReactNode, useContext, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Like } from "./svg";
import { Avatar } from "@/components/widgets/Avatar";
import { IComment } from "@/database/models/Comment";
import { IUser } from "@/database/models/User";
import { Reply } from "./svg/Reply";
import { CommentForm } from "../CommentForm";

import styles from "./Comment.module.css";
import { CommentsListContext } from "../context";

export interface ICommentProps extends Pick<IComment, "content" | "_id" | "createdAt" | "likes" | "replyToId"> {
    author: Pick<IUser, "name">;
    replies?: ICommentProps[];
}

export const Comment: FC<ICommentProps> = ({ author, content, likes, _id, replyToId, createdAt }) => {
    const { name } = author;

    const commentsListContext = useContext(CommentsListContext);
    if (!commentsListContext) return null;
    const { replyIdForm, setReplyIdForm } = commentsListContext;

    return (
        <li className={styles.comment} id={`comment-id-${_id}`}>
            <div className={styles.avatarContainer}>
                <Avatar className={styles.avatar} {...{ name }} />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.userName}>
                    <span>{name}</span>
                    {replyToId ? <Link href={`#comment-id-${replyToId}`}>reply to {replyToId}</Link> : null}
                    <span>{dayjs(createdAt).format("DD MMMM YYYY HH:mm")}</span>
                </div>
                <p className={styles.commentText}>{content}</p>
                <div className={styles.likesContainer}>
                    <Like className={likes ? styles.liked : undefined} />
                    <span className={styles.number}>{likes ? likes : ""}</span>
                    <button
                        className={styles.replyButton}
                        onClick={() => {
                            if (replyIdForm === _id) {
                                setReplyIdForm(null);
                            } else {
                                setReplyIdForm(_id);
                            }
                        }}
                    >
                        <Reply />
                    </button>
                </div>
                {replyIdForm === _id ? <CommentForm /> : null}
            </div>
        </li>
    );
};
