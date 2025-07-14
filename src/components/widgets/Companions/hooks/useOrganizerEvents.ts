import { useQuery } from "@apollo/client";
import { GET_ORGANIZER_EVENTS } from "@/app/api/graphql/queries/events";

import { user_id } from "@/constants/constants";

export const useOrganizerEvents = () => {
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
