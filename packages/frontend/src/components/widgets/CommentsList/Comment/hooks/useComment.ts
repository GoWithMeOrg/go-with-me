import { useState } from 'react';
import { CREATE_COMMENT_MUTATION, REMOVE_COMMENT_MUTATION } from '@/app/graphql/mutations/comment';
import { GET_COMMENTS_BY_OWNER_ID } from '@/app/graphql/queries/comment';
import { OwnerType } from '@/app/graphql/types';
import { useMutation } from '@apollo/client/react';

import { ReplyTo } from '../../types';

export interface UseCommentProps {
    owner_id: string;
}

export const useComment = ({ owner_id }: UseCommentProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        refetchQueries: [{ query: GET_COMMENTS_BY_OWNER_ID, variables: { ownerId: owner_id } }],
    });

    const [removeComment] = useMutation(REMOVE_COMMENT_MUTATION, {
        refetchQueries: [{ query: GET_COMMENTS_BY_OWNER_ID, variables: { ownerId: owner_id } }],
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

    const onDeleteComment = async (comment_id: string) => {
        setLoading(true);
        try {
            await removeComment({
                variables: {
                    commentId: comment_id,
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return { onSaveComment, onDeleteComment, loading, setLoading };
};
