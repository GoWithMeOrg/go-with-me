import { TOGGLE_LIKE_MUTATION } from '@/app/graphql/mutations/like';
import { GET_LIKES_COUNT, IS_LIKED_BY_USER } from '@/app/graphql/queries/like';
import { LikeProps } from '@/components/widgets/Like/interfaces/LikeProps';
import { useMutation, useQuery } from '@apollo/client/react';

const useLike = ({ owner_id, ownerType }: LikeProps) => {
    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
        refetchQueries: [{ query: GET_LIKES_COUNT, variables: { ownerId: owner_id } }],
    });
    const { data: isLikedData, refetch } = useQuery<{ isLikedByUser: boolean }>(IS_LIKED_BY_USER, {
        variables: { ownerId: owner_id },
    });

    const { data: likesCountData } = useQuery<{ getLikesCount: number }>(GET_LIKES_COUNT, {
        variables: { ownerId: owner_id },
    });

    const likesCount = likesCountData?.getLikesCount;

    const isLiked = !!isLikedData?.isLikedByUser;

    const handleLike = async () => {
        try {
            await toggleLike({
                variables: { ownerId: owner_id, ownerType },
                awaitRefetchQueries: true,
            });
        } catch (error) {
            console.error('Error deleting event: ', error);
        }
        refetch();
    };

    return {
        handleLike,
        isLiked,
        likesCount,
    };
};

export default useLike;
