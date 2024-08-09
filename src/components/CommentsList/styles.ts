import { IComment } from "@/database/models/Comment";

export interface ICommentProps
    extends Pick<IComment, "content" | "_id" | "createdAt" | "likes" | "replyTo" | "replies" | "author" | "parentId"> {}

export interface ReplyTo {
    id: string;
    userName: string;
}
