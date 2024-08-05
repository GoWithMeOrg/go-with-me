import { IComment } from "@/database/models/Comment";
import { IUser } from "@/database/models/User";

export interface ICommentProps extends Pick<IComment, "content" | "_id" | "createdAt" | "likes" | "replyToId"> {
    author: Pick<IUser, "name">;
    replies?: ICommentProps[];
}
