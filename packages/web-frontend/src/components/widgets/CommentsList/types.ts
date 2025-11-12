import { IComment } from '@/database/models/Comment';

export type ICommentData = Pick<
  IComment,
  'content' | '_id' | 'createdAt' | 'likes' | 'replyTo' | 'replies' | 'author' | 'parentId'
>;

export interface ReplyTo {
  id: string;
  userName: string;
}
