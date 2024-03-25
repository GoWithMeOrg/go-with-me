export interface IComment {
    commentId: string;
    replyToId?: string;
    userName: string;
    text: string;
    likesNumber: number;
    date: Date;
}
