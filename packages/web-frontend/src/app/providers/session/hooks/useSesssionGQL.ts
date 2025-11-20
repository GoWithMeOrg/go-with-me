'use client';

import { useContext } from 'react';
import { SessionContext } from '@/app/providers/session/context/session.context';

export function useSessionGQL() {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error('useSessionGQL must be used within a SessionProviderGQL');
    }

    return context;
}
