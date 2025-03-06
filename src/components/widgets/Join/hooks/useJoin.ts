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
    isJoined: boolean;
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
            isJoined
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
            isJoined
        }
    }
`;

const JOINED_BY_USER = gql`
    query JoinedByUser($eventId: ID!, $userId: ID!) {
        joinedByUser(event_id: $eventId, user_id: $userId) {
            _id
            event_id
            user_id
            isJoined
            createdAt
            updatedAt
        }
    }
`;

const useJoin = ({ event_id, user_id }: useJoinProps) => {
    const { data, refetch: refetchJoinedUsers } = useQuery<IGetJoinedQuery | null>(JOINED_BY_USERS, {
        variables: { eventId: event_id },
    });

    const { data: joinedByUser, refetch: refetchJoinedUser } = useQuery<{ joinedByUser: IJoined | null }>(
        JOINED_BY_USER,
        {
            variables: { eventId: event_id, userId: user_id },
        },
    );

    const joinedUsers = data?.joinedByUsers.length;
    const isJoined = joinedByUser?.joinedByUser?.isJoined;

    const [joinEventMutation] = useMutation(JOIN_EVENT_MUTATION);

    const handleJoin = async () => {
        try {
            await joinEventMutation({
                variables: { eventId: event_id, userId: user_id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        refetchJoinedUsers();
        refetchJoinedUser();
    };

    return {
        handleJoin,
        joinedUsers,
        isJoined,
    };
};

export default useJoin;
