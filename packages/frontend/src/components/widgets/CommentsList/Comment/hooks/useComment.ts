import { useState } from 'react';
import {
    CREATE_COMMENT_MUTATION,
    CREATE_REPLY_MUTATION,
    REMOVE_COMMENT_MUTATION,
} from '@/app/graphql/mutations/comment';
import { OwnerType } from '@/app/graphql/types';
import { useMutation } from '@apollo/client/react';

import { useCommentReplies } from './useChildrenComments';

export interface UseCommentProps {
    owner_id: string;
    parent_id?: string;
}

export const useComment = ({ owner_id, parent_id }: UseCommentProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const { removeReply } = useCommentReplies(parent_id);

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        refetchQueries: ['GetParrentCommentsByOwnerId'],
        awaitRefetchQueries: true,
    });

    const [createCommentReply] = useMutation(CREATE_REPLY_MUTATION, {
        refetchQueries: parent_id ? ['GetChildrenCommentsByParrentId'] : [],
        awaitRefetchQueries: true,
    });

    const [removeComment] = useMutation(REMOVE_COMMENT_MUTATION, {
        refetchQueries: parent_id
            ? ['GetChildrenCommentsByParrentId', 'GetParrentCommentsByOwnerId']
            : ['GetParrentCommentsByOwnerId'],
        awaitRefetchQueries: true,
    });

    const onSaveComment = async (content: string) => {
        setLoading(true);
        const saveCommentResponse = await createComment({
            variables: {
                createCommentInput: {
                    content,
                    ownerId: owner_id,
                    ownerType: OwnerType.Event,
                },
            },
        });
        if (!saveCommentResponse) {
            setLoading(false);
            return;
        }
        setLoading(false);
        return saveCommentResponse;
    };

    const onSaveCommentReply = async (content: string) => {
        setLoading(true);
        const saveCommentReply = await createCommentReply({
            variables: {
                createCommentInput: {
                    content,
                    ownerId: owner_id,
                    ownerType: OwnerType.Event,
                    parent: parent_id,
                },
            },
        });
        if (!saveCommentReply) {
            setLoading(false);
            return;
        }
        setLoading(false);
        return saveCommentReply;
    };

    const onDeleteComment = async (comment_id: string) => {
        setLoading(true);
        try {
            await removeComment({ variables: { commentId: comment_id } });
            removeReply?.(comment_id);
        } finally {
            setLoading(false);
        }
    };

    return { onSaveComment, onSaveCommentReply, onDeleteComment, loading, setLoading };
};
