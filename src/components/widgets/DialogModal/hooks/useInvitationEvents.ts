import { useQuery } from "@apollo/client";
import { useUserID } from "@/hooks/useUserID";
import { GET_COMPANION_INVITATION_EVENTS } from "@/app/api/graphql/queries/invations";

export const useInvitationEvents = () => {
    const { user_id } = useUserID();

    const {
        loading: loadingEvents,
        error: errorEvents,
        data: dataEvents,
    } = useQuery(GET_COMPANION_INVITATION_EVENTS, {
        variables: {
            organizerId: user_id,
        },
    });

    const events = dataEvents?.companionInvitationEvent;

    return {
        loadingEvents,
        errorEvents,
        events,
    };
};
