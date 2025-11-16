import { GET_APPLICATIONS } from '@/app/graphql/queries/applications';
import { GET_INVATIONS } from '@/app/graphql/queries/invations';
import { useQuery } from '@apollo/client/react';
import { useSession } from 'next-auth/react';

export const useNotifications = () => {
  const { data: session } = useSession();
  const user_id = session?.user.id;
  const { data, refetch } = useQuery(GET_APPLICATIONS, {
    variables: {
      userId: user_id,
    },
    pollInterval: 5000,
  });

  const { data: invations, refetch: refetchDataInvations } = useQuery(GET_INVATIONS, {
    variables: {
      userId: user_id,
    },
    pollInterval: 5000,
  });

  const dataApplications = data?.getApplications || [];
  const dataInvations = invations?.getInvitation || [];

  return { dataApplications, dataInvations, refetch, refetchDataInvations };
};
