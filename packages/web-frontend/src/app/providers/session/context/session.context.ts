import { createContext } from 'react';
import type { SessionState } from '@/app/providers/session/types/session.types';

export const SessionContext = createContext<SessionState | undefined>(undefined);
