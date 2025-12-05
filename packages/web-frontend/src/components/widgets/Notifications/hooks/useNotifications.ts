import { GET_APPLICATIONS } from '@/app/graphql/queries/applications';
import { GET_INVATIONS } from '@/app/graphql/queries/invations';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import { useQuery } from '@apollo/client/react';
import { useSession } from 'next-auth/react';

export const useNotifications = () => {
    const { data: session } = useSessionGQL();
    const user_id = session?._id;
    const { data, refetch } = useQuery(GET_APPLICATIONS, {
        variables: {
            userId: user_id,
        },
        // pollInterval: 5000,
    });

    const { data: invations, refetch: refetchDataInvations } = useQuery(GET_INVATIONS, {
        variables: {
            userId: user_id,
        },
        // pollInterval: 5000,
    });

    //@ts-ignore
    const dataApplications = data?.getApplications || [];
    //@ts-ignore
    const dataInvations = invations?.getInvitation || [];

    return { dataApplications, dataInvations, refetch, refetchDataInvations };
};
