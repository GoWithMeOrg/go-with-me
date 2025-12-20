import { useEffect, useMemo, useState } from 'react';
import { GET_ORGANIZER_EVENTS } from '@/app/graphql/queries/events';
import { GET_DECLINED_EVENTS } from '@/app/graphql/queries/invations';
import { GET_JOINED_EVENTS } from '@/app/graphql/queries/joined';
import { GET_LIKED_EVENTS } from '@/app/graphql/queries/liked';
import { useQuery } from '@apollo/client/react';
import { useSession } from 'next-auth/react';

import { IEvent, TabType } from '../types/events';
import { filterOrganizerByNewest, filterPast, filterUpcoming } from '../utils/getFilteredEvents';

interface FilterEventsProps {
    activeFilter: TabType;
}

export const useFilterEvents = ({ activeFilter }: FilterEventsProps) => {
    const [data, setData] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const sessionData = useSession();
    //@ts-ignore
    const user_id = sessionData?.data?.session?.user?.id;

    const {
        data: likedData,
        loading: likedLoading,
        error: likedError,
    } = useQuery(GET_LIKED_EVENTS, {
        variables: { userId: user_id },
        skip: !user_id || activeFilter !== TabType.WATCHLIST,
    });

    const {
        data: joinedData,
        loading: joinedLoading,
        error: joinedError,
    } = useQuery(GET_JOINED_EVENTS, {
        variables: { userId: user_id },
        skip: !user_id || ![TabType.UPCOMING, TabType.PAST].includes(activeFilter),
    });

    const {
        data: organizerData,
        loading: organizerLoading,
        error: organizerError,
    } = useQuery(GET_ORGANIZER_EVENTS, {
        variables: { organizerId: user_id },
        skip: !user_id || activeFilter !== TabType.ORGANIZED,
    });

    const {
        data: declinedData,
        loading: declinedLoading,
        error: declinedError,
    } = useQuery(GET_DECLINED_EVENTS, {
        variables: { userId: user_id },
        skip: !user_id || activeFilter !== TabType.DECLINED,
    });

    const now = useMemo(() => new Date(), []);

    useEffect(() => {
        setLoading(true);
        setError(null);

        switch (activeFilter) {
            case TabType.WATCHLIST:
                if (likedData) {
                    //@ts-ignore
                    setData(likedData.events ?? []);
                    setLoading(likedLoading);
                    setError(likedError ?? null);
                }
                break;

            case TabType.UPCOMING:
                if (joinedData) {
                    //@ts-ignore
                    const upcomingData = filterUpcoming(joinedData.events ?? [], now);
                    setData(upcomingData);
                    setLoading(joinedLoading);
                    setError(joinedError ?? null);
                }
                break;

            case TabType.PAST:
                if (joinedData) {
                    //@ts-ignore
                    const pastData = filterPast(joinedData.events ?? [], now);
                    setData(pastData);
                    setLoading(joinedLoading);
                    setError(joinedError ?? null);
                }
                break;

            case TabType.ORGANIZED:
                if (organizerData) {
                    const filterOrganizer = filterOrganizerByNewest(
                        //@ts-ignore
                        organizerData.allOrganizerEvents ?? [],
                        now
                    );
                    setData(filterOrganizer);
                    setLoading(organizerLoading);
                    setError(organizerError ?? null);
                }
                break;

            case TabType.DECLINED:
                if (declinedData) {
                    //@ts-ignore
                    setData(declinedData.events ?? []);
                    setLoading(declinedLoading);
                    setError(declinedError ?? null);
                }
                break;

            default:
                setData([]);
                setLoading(false);
                setError(null);
        }
    }, [
        activeFilter,
        likedData,
        likedLoading,
        likedError,
        joinedData,
        joinedLoading,
        joinedError,
        organizerData,
        organizerLoading,
        organizerError,
        declinedData,
        declinedLoading,
        declinedError,
        now,
    ]);

    return {
        data,
        loading,
        error,
    };
};
