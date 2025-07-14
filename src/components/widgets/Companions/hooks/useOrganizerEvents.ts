import { useQuery } from "@apollo/client";
import { GET_ORGANIZER_EVENTS } from "@/app/api/graphql/queries/events";
import { useSession } from "next-auth/react";

export const useOrganizerEvents = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;

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
