"use client";
import { FC, MouseEventHandler } from "react";
import Link from "next/link";
import dayjs from "dayjs";

import { Avatar } from "@/components/shared/Avatar";
import ArrowReply from "@/assets/icons/arrowReply.svg";
import Heart from "@/assets/icons/heart.svg";

import { ICommentData, ReplyTo } from "../types";

import classes from "./Comment.module.css";

interface IProps {
    comment: ICommentData;
    onClickReplyButton: ({}: { replyTo: ReplyTo; parentId: string }) => void;
    onClickLikeButton: ({}: { commentId: string }) => void;
}

export const Comment: FC<IProps> = ({
    comment: { author, content, likes, _id, replyTo, createdAt, parentId },
    onClickReplyButton,
    onClickLikeButton,
}) => {
    const { name } = author;
    const id = _id.toString();

    return (
        <div className={classes.comment} id={`comment-id-${id}`}>
            <div className={classes.avatarContainer}>
                <Avatar className={classes.avatar} name={name} />
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.userName}>
                    <span>{name}</span>
                    {replyTo ? <Link href={`#comment-id-${replyTo.id}`}>reply to {replyTo.userName}</Link> : null}
                    <span>{dayjs(createdAt).format("DD MMMM YYYY HH:mm")}</span>
                </div>
                <p className={classes.commentText}>{content}</p>
                <div className={classes.likesContainer}>
                    <button className={classes.likeButton} onClick={() => onClickLikeButton({ commentId: id })}>
                        <Heart className={likes.length ? classes.liked : undefined} />
                    </button>
                    <span className={classes.number}>{likes.length ? likes.length : ""}</span>
                    <button
                        className={classes.replyButton}
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
