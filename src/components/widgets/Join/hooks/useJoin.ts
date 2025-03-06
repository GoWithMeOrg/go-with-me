import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

interface useJoinProps {
    event_id: string;
    user_id?: string | null;
}

type IJoined = {
    _id: string;
    event_id: string;
    user_id: string;
    joined: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export interface IGetJoinedQuery {
    joinedByUsers: IJoined[];
}

const JOIN_EVENT_MUTATION = gql`
    mutation Mutation($eventId: ID!, $userId: ID!) {
        joinEvent(event_id: $eventId, user_id: $userId) {
            _id
            event_id
            user_id
            joined
            createdAt
            updatedAt
        }
    }
`;

const JOINED_BY_USERS = gql`
    query GetJoinedByUsers($eventId: ID) {
        joinedByUsers(event_id: $eventId) {
            _id
            event_id
            user_id
            joined
        }
    }
`;
const useJoin = ({ event_id, user_id }: useJoinProps) => {
    const {
        loading,
        data: joinedByUsers,
        refetch,
    } = useQuery<IGetJoinedQuery>(JOINED_BY_USERS, {
        variables: { eventId: event_id },
    });

    const [joinEventMutation] = useMutation(JOIN_EVENT_MUTATION);

    const handleJoin = async () => {
        try {
            await joinEventMutation({
                variables: { eventId: event_id, userId: user_id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        refetch();
    };
    //проверяем добавлен ли пользователь
    const joinedUser = loading
        ? undefined // Пока загружаются данные, не меняем состояние
        : (joinedByUsers?.joinedByUsers.some((user) => user.user_id === user_id) ?? false);

    return {
        handleJoin,
        joinedByUsers,
        joinedUser,
    };
};

export default useJoin;
