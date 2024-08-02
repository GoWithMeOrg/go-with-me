"use client";
import { FC } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Like } from "./svg";
import { Avatar } from "../../Avatar";
import { Reply } from "./svg/Reply";
import { ICommentProps } from "../styles";

import styles from "./Comment.module.css";

interface CommentProps {
    onClickReplyButton: ({ _id }: { _id: string }) => void;
}

export const Comment: FC<ICommentProps & CommentProps> = ({
    author,
    content,
    likes,
    _id,
    replyToId,
    createdAt,
    onClickReplyButton,
}) => {
    const { name } = author;

    return (
        <div className={styles.comment} id={`comment-id-${_id}`}>
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
                            onClickReplyButton({ _id });
                        }}
                    >
                        <Reply />
                    </button>
                </div>
            </div>
        </div>
    );
};
