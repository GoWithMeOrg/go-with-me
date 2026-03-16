import { useEffect } from 'react';
import { GET_COMPANION_REQUESTS } from '@/app/graphql/queries/companionRequest';
import { GET_INVATIONS } from '@/app/graphql/queries/invations';
import { COMPANION_REQUEST_SUBSCRIPTION } from '@/app/graphql/subscriptions/companionRequest';
import {
    GetCompanionRequestsQuery,
    GetCompanionRequestsQueryVariables,
    Subscription,
} from '@/app/graphql/types';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import { useQuery } from '@apollo/client/react';

export const useNotifications = () => {
    const { data: session } = useSessionGQL();
    const user_id = session?._id;

    const { data, subscribeToMore, ...result } = useQuery<
        GetCompanionRequestsQuery,
        GetCompanionRequestsQueryVariables
    >(GET_COMPANION_REQUESTS, {
        variables: { userId: user_id as string },
        skip: !user_id,
    });

    const { data: invations, refetch: refetchDataInvations } = useQuery(GET_INVATIONS, {
        variables: {
            user_id: user_id,
        },
        // pollInterval: 5000,
    });

    useEffect(() => {
        if (!user_id) return;

        const unsubscribe = subscribeToMore<Subscription>({
            document: COMPANION_REQUEST_SUBSCRIPTION,
            //@ts-ignore
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                console.log('subscriptionData', subscriptionData);
                const payload = subscriptionData.data.sendRequestCompanion;
                const currentUserId = subscriptionData.data.sendRequestCompanion.receiver._id;

                // проверяем, что событие предназначено для текущего пользователя
                if (currentUserId !== user_id) return prev;

                // защита от дубликатов
                const prevList = prev.getCompanionRequests || [];
                if (prevList.some((item) => item?._id === payload._id)) return prev;

                return {
                    getCompanionRequests: [payload, ...prevList],
                };
            },
        });

        return () => unsubscribe();
    }, [user_id, subscribeToMore]);

    const requests = data?.getCompanionRequests?.filter((req) => req?.status === 'PENDING') || [];

    const hasNewNotifications = requests.length > 0;

    return { requests, hasNewNotifications };
};
