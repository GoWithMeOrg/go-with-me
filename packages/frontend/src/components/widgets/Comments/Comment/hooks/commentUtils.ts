import { Comment as CommentType, OwnerType } from '@/app/graphql/types';

export const buildOptimisticComment = (
    content: string,
    ownerId: string,
    parentId?: string
): CommentType =>
    ({
        __typename: 'Comment',
        _id: `temp-${Date.now()}`,
        author: { __typename: 'User', _id: '', firstName: '', lastName: '', image: null },
        content,
        createdAt: new Date().toISOString(),
        deleted: false,
        ownerId,
        ownerType: OwnerType.Event,
        parent: parentId
            ? { __typename: 'Comment', _id: parentId }
            : null,
        repliesCount: 0,
        updatedAt: new Date().toISOString(),
    }) as unknown as CommentType;
