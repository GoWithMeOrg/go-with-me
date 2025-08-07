import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import { GET_ORGANIZER_EVENTS } from "@/app/api/graphql/queries/events";
import { GET_USER_BY_ID } from "@/app/api/graphql/queries/user";
import { COMPANION_REQUEST_MUTATION } from "@/app/api/graphql/mutations/companionRequest";
import { useUserID } from "@/hooks/useUserID";

export const usePublicProfile = () => {
    const { user_id, status } = useUserID();
    const params = useParams();

    const isOwner = user_id === params.user_id;

    const { data: userData } = useQuery(GET_USER_BY_ID, { variables: { userId: params.user_id } });
    const { data: eventsData } = useQuery(GET_ORGANIZER_EVENTS, {
        variables: { organizerId: params.user_id },
    });

    const [CompanionRequest] = useMutation(COMPANION_REQUEST_MUTATION);

    const companionRequest = async () => {
        try {
            await CompanionRequest({
                variables: { senderId: user_id, receiverId: params.user_id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return {
        user_id,
        userData,
        eventsData,
        status,
        isOwner,
        companionRequest,
    };
};
