import { useQuery } from '@apollo/client/react';

import type {
    CompanionInvitationEventQuery,
    CompanionInvitationEventQueryVariables,
    GetOrganizerEventsForInviteQuery,
    GetOrganizerEventsForInviteQueryVariables,
} from '@/app/graphql/operations';
import {
    GET_COMPANION_INVITATION_EVENTS,
    GET_ORGANIZER_EVENTS_FOR_INVITE,
} from '@/app/graphql/queries/invations';
import { useUserID } from '@/hooks/useUserID';

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
    } = useQuery<CompanionInvitationEventQuery | GetOrganizerEventsForInviteQuery>(query, {
        variables: variables as
            CompanionInvitationEventQueryVariables | GetOrganizerEventsForInviteQueryVariables,
        skip: !user_id,
    });

    const events = hasCompanion
        ? ((dataEvents as CompanionInvitationEventQuery | undefined)?.companionInvitationEvent ??
          [])
        : ((dataEvents as GetOrganizerEventsForInviteQuery | undefined)?.events ?? []);

    return {
        loadingEvents,
        errorEvents,
        events,
    };
};
