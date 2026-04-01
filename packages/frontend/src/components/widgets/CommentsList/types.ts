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
