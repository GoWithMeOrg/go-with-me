"use client";
import { FC, MouseEventHandler } from "react";
import Link from "next/link";
import dayjs from "dayjs";

import { Avatar } from "../../Avatar";
import { ICommentProps, ReplyTo } from "../types";
import ArrowReply from "@/assets/icons/arrowReply.svg";
import Heart from "@/assets/icons/heart.svg";

import styles from "./Comment.module.css";

interface CommentProps {
    onClickReplyButton: ({}: { replyTo: ReplyTo; parentId: string }) => void;
    onClickLikeButton?: MouseEventHandler<HTMLButtonElement>;
}

export const Comment: FC<ICommentProps & CommentProps> = ({
    author,
    content,
    likes,
    _id,
    replyTo,
    createdAt,
    onClickReplyButton,
    onClickLikeButton,
    parentId,
}) => {
    const { name } = author;
    const id = _id.toString();

    return (
        <div className={styles.comment} id={`comment-id-${id}`}>
            <div className={styles.avatarContainer}>
                <Avatar className={styles.avatar} name={name} />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.userName}>
                    <span>{name}</span>
                    {replyTo ? <Link href={`#comment-id-${replyTo.id}`}>reply to {replyTo.userName}</Link> : null}
                    <span>{dayjs(createdAt).format("DD MMMM YYYY HH:mm")}</span>
                </div>
                <p className={styles.commentText}>{content}</p>
                <div className={styles.likesContainer}>
                    <button onClick={onClickLikeButton}>
                        <Heart className={likes ? styles.liked : undefined} />
                    </button>
                    <span className={styles.number}>{likes ? likes : ""}</span>
                    <button
                        className={styles.replyButton}
                        onClick={() =>
                            onClickReplyButton({
                                replyTo: { id, userName: name },
                                parentId: parentId ? parentId?.toString() : id,
                            })
                        }
                    >
                        <ArrowReply />
                    </button>
                </div>
            </div>
        </div>
    );
};
