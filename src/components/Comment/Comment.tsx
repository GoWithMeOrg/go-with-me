"use client";
import { FC } from "react";
import { Like } from "./svg";
import { Avatar } from "../Avatar";

import styles from "./Comment.module.css";
import { IComment } from "./types";
import Link from "next/link";

type CommentProps = IComment;

export const Comment: FC<CommentProps> = ({ userName, text, likesNumber, commentId, replyToId, date }) => {
    return (
        <li className={styles.comment} id={`comment-id-${commentId}`}>
            <div className={styles.avatarContainer}>
                <Avatar className={styles.avatar} {...{ userName }} />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.userName}>
                    <span>{userName}</span>
                    <span>{commentId}</span>
                    {replyToId ? <Link href={`#comment-id-${replyToId}`}>reply to {replyToId}</Link> : null}
                    <span>{date.toISOString()}</span>
                </div>
                <p className={styles.commentText}>{text}</p>
                <div className={styles.likesContainer}>
                    <Like className={likesNumber ? styles.liked : undefined} />
                    <span className={styles.number}>{likesNumber ? likesNumber : ""}</span>
                </div>
            </div>
        </li>
    );
};
