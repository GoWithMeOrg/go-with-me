import {
    GET_COMPANION_INVITATION_EVENTS,
    GET_ORGANIZER_EVENTS_FOR_INVITE,
} from '@/app/graphql/queries/invations';
import { useUserID } from '@/hooks/useUserID';
import { useQuery } from '@apollo/client/react';

export const useInvitationEvents = (companionId: string | null) => {
    const { user_id } = useUserID();

    const hasCompanion = !!companionId;

    const query = hasCompanion ? GET_COMPANION_INVITATION_EVENTS : GET_ORGANIZER_EVENTS_FOR_INVITE;
    const variables = hasCompanion
        ? { organizerId: user_id, companionId }
        : { organizerId: user_id };

    const {
        loading: loadingEvents,
        error: errorEvents,
        data: dataEvents,
    } = useQuery(query, {
        variables,
        skip: !user_id,
    });

    const events = hasCompanion
        ? (dataEvents as any)?.companionInvitationEvent ?? []
        : (dataEvents as any)?.events ?? [];

    return {
        loadingEvents,
        errorEvents,
        events,
    };
};
