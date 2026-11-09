'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';

import { GET_SESSION } from '@/app/graphql/queries/session';
import type { AuthStatus, Session } from '@/app/providers/session/types/session.types';

export function useSessionFetch() {
    const { data, loading, error } = useQuery(GET_SESSION);

    // Локально обновлённая сессия (например, после редактирования профиля)
    const [updatedSession, setUpdatedSession] = useState<Session | null>(null);

    const querySession = (data as { session?: Session | null } | undefined)?.session ?? null;
    const sessionData = updatedSession ?? querySession;

    const status: AuthStatus = loading
        ? 'loading'
        : error || !querySession
          ? 'unauthenticated'
          : 'authenticated';

    return { sessionData, status, setSessionData: setUpdatedSession };
}
