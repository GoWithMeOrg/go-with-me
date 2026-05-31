export interface ReplyTo {
    id: string;
    userName: string;
}

export interface LikeState {
    [ownerId: string]: {
        isLiked: boolean;
        count: number;
    };
}
