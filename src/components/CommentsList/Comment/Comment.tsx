"use client";
import { FC } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Like } from "./svg";
import { Avatar } from "../../Avatar";
import { Reply } from "./svg/Reply";
import { ICommentProps, ICommentsListState } from "../styles";

import styles from "./Comment.module.css";

export const Comment: FC<ICommentProps & ICommentsListState> = ({
    author,
    content,
    likes,
    _id,
    replyToId,
    createdAt,
    replyIdState,
    setReplyIdState,
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
                            if (replyIdState === _id) {
                                setReplyIdState(null);
                            } else {
                                setReplyIdState(_id);
                            }
                        }}
                    >
                        <Reply />
                    </button>
                </div>
            </div>
        </div>
    );
};
