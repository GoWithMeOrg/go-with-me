import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

interface useJoinProps {
    eventID: string;
    userID: string | null;
}

const GET_EVENT_BY_ID = gql`
    query GetEventById($id: ID!) {
        event(id: $id) {
            _id
            organizer_id
            organizer {
                _id
                name
                email
                image
            }
            name
            location {
                coordinates
                properties {
                    address
                }
            }
            status
            description
            startDate
            endDate
            time
            categories
            types
            tags
            image
            joined
        }
        comments(event_id: $id) {
            _id
            author {
                _id
                name
                email
            }
            content
            createdAt
            updatedAt
            likes
            replies {
                _id
                author {
                    _id
                    name
                    email
                }
                content
                createdAt
                updatedAt
                likes
            }
        }
    }
`;

const JOIN_EVENT_MUTATION = gql`
    mutation JoinEvent($eventId: ID!, $userId: ID!) {
        joinEvent(eventId: $eventId, userId: $userId) {
            joined
        }
    }
`;

const useJoin = ({ eventID, userID }: useJoinProps) => {
    const { refetch } = useQuery(GET_EVENT_BY_ID, { variables: { id: eventID } });
    const [joinEventMutation] = useMutation(JOIN_EVENT_MUTATION);

    const handleJoin = async () => {
        try {
            await joinEventMutation({
                variables: { eventId: eventID, userId: userID },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        refetch();
    };
    return { handleJoin };
};

export default useJoin;
