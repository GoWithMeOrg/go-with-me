'use client';

import { useEffect, useState } from 'react';
import { GET_SESSION } from '@/app/graphql/queries/session';
import type { AuthStatus, Session } from '@/app/providers/session/types/session.types';
import { useQuery } from '@apollo/client/react';

export function useSessionFetch() {
    const { data, loading, error } = useQuery(GET_SESSION);

    const [sessionData, setSessionData] = useState<Session | null>(null);
    const [status, setStatus] = useState<AuthStatus>('loading');

    useEffect(() => {
        if (loading) {
            setStatus('loading');
            return;
        }

        if (error) {
            setStatus('unauthenticated');
            setSessionData(null);
            return;
        }

        //@ts-ignore
        const session = data?.session as Session | undefined;

        if (session) {
            setSessionData(session);
            setStatus('authenticated');
        } else {
            setSessionData(null);
            setStatus('unauthenticated');
        }
    }, [loading, error, data]);

    return { sessionData, status, setSessionData };
}
