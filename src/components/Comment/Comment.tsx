"use client";
import { FC } from "react";
import { Like } from "./svg";
import { Avatar } from "../Avatar";

import styles from "./Comment.module.css";
import Link from "next/link";
import { IComment } from "@/database/models/Comment";
import { IUser } from "@/database/models/User";

export interface ICommentProps extends Pick<IComment, "content" | "_id" | "createdAt"> {
    author: Pick<IUser, "name">;
    replyToId?: string;
    likesNumber: number;
}

export const Comment: FC<ICommentProps> = ({ author, content, likesNumber, _id, replyToId, createdAt }) => {
    const { name } = author;
    return (
        <li className={styles.comment} id={`comment-id-${_id}`}>
            <div className={styles.avatarContainer}>
                <Avatar className={styles.avatar} {...{ name }} />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.userName}>
                    <span>{name}</span>
                    <span>{_id}</span>
                    {replyToId ? <Link href={`#comment-id-${replyToId}`}>reply to {replyToId}</Link> : null}
                    <span>{createdAt.toISOString()}</span>
                </div>
                <p className={styles.commentText}>{content}</p>
                <div className={styles.likesContainer}>
                    <Like className={likesNumber ? styles.liked : undefined} />
                    <span className={styles.number}>{likesNumber ? likesNumber : ""}</span>
                </div>
            </div>
        </li>
    );
};
