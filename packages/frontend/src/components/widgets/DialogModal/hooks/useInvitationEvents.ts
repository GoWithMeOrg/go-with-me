import { GET_COMPANION_INVITATION_EVENTS } from '@/app/graphql/queries/invations';
import { useUserID } from '@/hooks/useUserID';
import { useQuery } from '@apollo/client/react';

export const useInvitationEvents = (companionId: string) => {
    const { user_id } = useUserID();

    const {
        loading: loadingEvents,
        error: errorEvents,
        data: dataEvents,
    } = useQuery(GET_COMPANION_INVITATION_EVENTS, {
        variables: {
            organizerId: user_id,
            companionId: companionId,
        },
    });
    //@ts-ignore
    const events = dataEvents?.companionInvitationEvent;

    return {
        loadingEvents,
        errorEvents,
        events,
    };
};
