import { LIKE_MUTATION } from '@/app/api/graphql/mutations/like';
import { GET_LIKED_EVENTS, LIKED } from '@/app/api/graphql/queries/liked';
import { ILike } from '@/components/widgets/Like/types/Ilike';
import { LikeProps } from '@/components/widgets/Like/types/LikeProps';
import { useMutation, useQuery } from '@apollo/client/react';

const useLike = ({ event_id, user_id }: LikeProps) => {
  const [likeMutation] = useMutation(LIKE_MUTATION);
  const { data, refetch } = useQuery<{ liked: ILike | null }>(LIKED, {
    variables: { eventId: event_id, userId: user_id },
  });

  const isLiked = data?.liked?.isLiked;

  const handleLike = async () => {
    try {
      await likeMutation({
        variables: { eventId: event_id, userId: user_id },
        refetchQueries: [
          {
            query: GET_LIKED_EVENTS,
            variables: { userId: user_id },
          },
        ],
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
