"use client";
import { FC } from "react";
import { Like, Reply } from "./svg";
import { Avatar } from "../Avatar";

import styles from "./Comment.module.css";
import { IComment } from "./types";
import Link from "next/link";
import { Button } from "../Button";

type CommentProps = IComment;

export const Comment: FC<CommentProps> = ({ userName, text, likesNumber, commentId, replyToId, date }) => {
    return (
        <li className={styles.comment} id={`comment-id-${commentId}`}>
            <div className={styles.avatarContainer}>
                <Avatar className={styles.avatar} {...{ userName }} />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.userName}>
                    <span className={styles.additionalColor}>#{commentId}</span>
                    <span>{userName}</span>
                    {replyToId ? <Link href={`#comment-id-${replyToId}`}>reply to {replyToId}</Link> : null}
                    <span className={styles.date}>{date.toISOString()}</span>
                </div>
                <p className={styles.commentText}>{text}</p>
                <div className={styles.likesContainer}>
                    <Like className={likesNumber ? styles.liked : undefined} />
                    <span className={styles.number}>{likesNumber ? likesNumber : ""}</span>
                    <button className={styles.reply}>
                        <Reply />
                    </button>
                </div>
            </div>
        </li>
    );
};
