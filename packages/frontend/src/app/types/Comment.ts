import { User } from '@/app/graphql/types';

export interface INewComment {
    author_id: string;
    event_id: string;
    content: string;
    replyTo?: {
        id: string;
        userName: string;
    };
    parentId?: string;
}

export interface IComment extends INewComment {
    _id: string;
    author: User;
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
    replies: IComment[];
    replyToList: string[];
}
