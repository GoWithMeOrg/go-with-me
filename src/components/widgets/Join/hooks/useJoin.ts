import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

interface useJoinProps {
    eventID: string;
    userID: string | null;
}

const JOIN_EVENT_MUTATION = gql`
    mutation JoinEvent($eventId: ID!, $userId: ID!) {
        joinEvent(eventId: $eventId, userId: $userId) {
            joined
        }
    }
`;

const useJoin = ({ eventID, userID }: useJoinProps) => {
    const [joinEventMutation] = useMutation(JOIN_EVENT_MUTATION);

    const handleJoin = async () => {
        try {
            await joinEventMutation({
                variables: { eventId: eventID, userId: userID },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };
    return { handleJoin };
};

export default useJoin;
