import { useQuery } from "@apollo/client";
import { GET_ORGANIZER_EVENTS } from "@/app/api/graphql/queries/events";
import { useUserID } from "@/hooks/useUserID";

export const useOrganizerEvents = () => {
    const { user_id } = useUserID();

    const {
        loading: loadingEvents,
        error: errorEvents,
        data: dataEvents,
    } = useQuery(GET_ORGANIZER_EVENTS, {
        variables: {
            organizerId: user_id,
        },
    });

    const events = dataEvents?.allOrganizerEvents;

    return {
        loadingEvents,
        errorEvents,
        events,
    };
};
