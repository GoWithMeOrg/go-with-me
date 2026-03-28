import type { IComment } from '@/app/types/Comment';

export type ICommentData = Pick<
    IComment,
    'content' | '_id' | 'createdAt' | 'likes' | 'replyTo' | 'replies' | 'author' | 'parentId'
>;

export interface ReplyTo {
    id: string;
    userName: string;
}

export interface ICommentAuthor {
    _id: string;
    firstName: string;
    lastName: string;
    image?: string | null;
}
