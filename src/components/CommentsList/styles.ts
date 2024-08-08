import { IComment } from "@/database/models/Comment";

export interface ICommentProps
    extends Pick<
        IComment,
        "content" | "_id" | "createdAt" | "likes" | "replyToId" | "replies" | "author" | "parentId"
    > {}
