"use client";
import { FC } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Avatar } from "../../Avatar";
import { ICommentProps, ReplyTo } from "../styles";
import ArrowReply from "@/assets/icons/arrowReply.svg";
import Heart from "@/assets/icons/heart.svg";

import styles from "./Comment.module.css";

interface CommentProps {
    onClickReplyButton: ({ replyTo, parentId }: { replyTo: ReplyTo; parentId: string }) => void;
}

export const Comment: FC<ICommentProps & CommentProps> = ({
    author,
    content,
    likes,
    _id,
    replyTo,
    createdAt,
    onClickReplyButton,
    parentId,
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
                    {replyTo ? <Link href={`#comment-id-${replyTo.id}`}>reply to {replyTo.userName}</Link> : null}
                    <span>{dayjs(createdAt).format("DD MMMM YYYY HH:mm")}</span>
                </div>
                <p className={styles.commentText}>{content}</p>
                <div className={styles.likesContainer}>
                    <Heart className={likes ? styles.liked : undefined} />
                    <span className={styles.number}>{likes ? likes : ""}</span>
                    <button
                        className={styles.replyButton}
                        onClick={() => {
                            onClickReplyButton({
                                // id: _id.toString(),
                                replyTo: { id: _id.toString(), userName: name },
                                parentId: parentId ? parentId?.toString() : _id.toString(),
                            });
                        }}
                    >
                        <ArrowReply />
                    </button>
                </div>
            </div>
        </div>
    );
};
