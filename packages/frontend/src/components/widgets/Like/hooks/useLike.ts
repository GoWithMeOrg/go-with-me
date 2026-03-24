import { TOGGLE_LIKE_MUTATION } from '@/app/graphql/mutations/like';
import { IS_LIKED_BY_USER } from '@/app/graphql/queries/like';
import { LikeProps } from '@/components/widgets/Like/interfaces/LikeProps';
import { useMutation, useQuery } from '@apollo/client/react';

const useLike = ({ event_id }: LikeProps) => {
    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);
    const { data: isLikedData, refetch } = useQuery<{ isLikedByUser: boolean }>(IS_LIKED_BY_USER, {
        variables: { ownerId: event_id },
    });

    const isLiked = !!isLikedData?.isLikedByUser;

    const handleLike = async () => {
        try {
            await toggleLike({
                variables: { ownerId: event_id, ownerType: 'Event' },
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
    };
};

export default useLike;
