import { IComment } from '@go-with-me/backend/src/types';

export type ICommentData = Pick<
  IComment,
  'content' | '_id' | 'createdAt' | 'likes' | 'replyTo' | 'replies' | 'author' | 'parentId'
>;

export interface ReplyTo {
  id: string;
  userName: string;
}
