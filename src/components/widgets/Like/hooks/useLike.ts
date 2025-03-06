import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

interface useLikeProps {
    event_id: string;
    user_id: string;
}

type ILike = {
    _id: string;
    event_id: string;
    user_id: string;
    isLiked: boolean;
    createdAt?: string;
    updatedAt?: string;
};

const LIKE_MUTATION = gql`
    mutation Mutation($eventId: ID!, $userId: ID!) {
        like(event_id: $eventId, user_id: $userId) {
            _id
            event_id
            user_id
            isLiked
            createdAt
            updatedAt
        }
    }
`;

const LIKED = gql`
    query Liked($eventId: ID, $userId: ID) {
        liked(event_id: $eventId, user_id: $userId) {
            _id
            event_id
            user_id
            isLiked
            createdAt
            updatedAt
        }
    }
`;
const useLike = ({ event_id, user_id }: useLikeProps) => {
    const [likeMutation] = useMutation(LIKE_MUTATION);
    const { data, refetch } = useQuery<{ liked: ILike | null }>(LIKED, {
        variables: { eventId: event_id, userId: user_id },
    });

    const isLiked = data?.liked?.isLiked;

    const handleLike = async () => {
        try {
            await likeMutation({
                variables: { eventId: event_id, userId: user_id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        refetch();
    };

    return {
        handleLike,
        isLiked,
    };
};

export default useLike;
