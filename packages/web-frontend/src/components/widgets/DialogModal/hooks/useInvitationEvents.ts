import { GET_COMPANION_INVITATION_EVENTS } from '@/app/api/graphql/queries/invations';
import { useUserID } from '@/hooks/useUserID';
import { useQuery } from '@apollo/client/react';

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
