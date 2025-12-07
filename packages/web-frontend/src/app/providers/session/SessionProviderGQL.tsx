'use client';

import { FC, ReactNode, useCallback } from 'react';
import { SessionContext } from '@/app/providers/session/context/session.context';
import { useSessionFetch } from '@/app/providers/session/hooks/useSessionFetch';
import type { SessionState, UpdateSession } from '@/app/providers/session/types/session.types';

export const SessionProviderGQL: FC<{ children: ReactNode }> = ({ children }) => {
    const { sessionData, status, setSessionData } = useSessionFetch();

    const update: UpdateSession = useCallback(
        (updateData) => {
            if (sessionData) {
                setSessionData({ ...sessionData, ...updateData });
            }
        },
        [sessionData, setSessionData]
    );

    const value: SessionState =
        status === 'authenticated'
            ? {
                  update,
                  data: sessionData!,
                  status: 'authenticated',
              }
            : {
                  update,
                  data: null,
                  status,
              };

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
