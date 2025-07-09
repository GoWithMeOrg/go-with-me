import { useEffect, useMemo, useState } from "react";
import { IEvent, TabType } from "../types/events";
import { useSession } from "next-auth/react";

import { ApolloError, useQuery } from "@apollo/client";
import { GET_LIKED_EVENTS } from "@/app/api/graphql/queries/liked";
import { GET_JOINED_EVENTS } from "@/app/api/graphql/queries/joined";
import { GET_ORGANIZER_EVENTS } from "@/app/api/graphql/queries/events";

import { filterOrganizerByNewest, filterPast, filterUpcoming } from "../utils/getFilteredEvents";

interface FilterEventsProps {
    activeFilter: TabType;
}

export const useFilterEvents = ({ activeFilter }: FilterEventsProps) => {
    const [data, setData] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ApolloError | null>(null);

    const { data: session } = useSession();
    const user_id = session?.user.id;

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

    const now = useMemo(() => new Date(), []);

    useEffect(() => {
        setLoading(true);
        setError(null);

        switch (activeFilter) {
            case TabType.WATCHLIST:
                if (likedData) {
                    setData(likedData.events ?? []);
                    setLoading(likedLoading);
                    setError(likedError ?? null);
                }
                break;

            case TabType.UPCOMING:
                if (joinedData) {
                    const upcomingData = filterUpcoming(joinedData.events ?? [], now);
                    setData(upcomingData);
                    setLoading(joinedLoading);
                    setError(joinedError ?? null);
                }
                break;

            case TabType.PAST:
                if (joinedData) {
                    const pastData = filterPast(joinedData.events ?? [], now);
                    setData(pastData);
                    setLoading(joinedLoading);
                    setError(joinedError ?? null);
                }
                break;

            case TabType.ORGANIZED:
                if (organizerData) {
                    const filterOrganizer = filterOrganizerByNewest(organizerData.allOrganizerEvents ?? [], now);
                    setData(filterOrganizer);
                    setLoading(organizerLoading);
                    setError(organizerError ?? null);
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
        now,
    ]);

    return {
        data,
        loading,
        error,
    };
};
