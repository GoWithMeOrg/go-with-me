'use client';

import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { GET_SESSION } from '@/app/api/graphql/queries/session';
import { useQuery } from '@apollo/client/react';

// Определяем типы как в ошибке
interface Session {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

type UpdateSession = (updateData?: Partial<Session>) => void;

// Создаем контекст с точным типом из ошибки
const SessionContext = createContext<
    | {
          update: UpdateSession;
          data: Session;
          status: 'authenticated';
      }
    | {
          update: UpdateSession;
          data: null;
          status: 'unauthenticated' | 'loading';
      }
    | undefined
>(undefined);

export const SessionProviderGQL: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, loading, error } = useQuery(GET_SESSION);

    // console.log(data);
    const [sessionData, setSessionData] = useState<Session | null>(null);
    const [status, setStatus] = useState<'authenticated' | 'unauthenticated' | 'loading'>(
        'loading'
    );

    useEffect(() => {
        if (loading) {
            setStatus('loading');
            return;
        }

        if (error) {
            console.error('Ошибка получения сессии: Пользователь не авторизован');
            setStatus('unauthenticated');
            setSessionData(null);
            return;
        }

        //@ts-ignore
        const session = data?.session;

        if (session) {
            setSessionData(session);
            setStatus('authenticated');
        } else {
            setSessionData(null);
            setStatus('unauthenticated');
        }
    }, [data, loading, error]);

    // Метод обновления сессии
    const update: UpdateSession = (updateData?: Partial<Session>) => {
        if (sessionData) {
            setSessionData({
                ...sessionData,
                ...updateData,
            });
        }
    };

    // Значения для контекста с точным типом
    const contextValue =
        status === 'authenticated'
            ? {
                  update,
                  data: sessionData as Session,
                  status: 'authenticated' as const,
              }
            : {
                  update,
                  data: null,
                  status: status as 'unauthenticated' | 'loading',
              };

    return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
};

export const useSessionGQL = () => {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error('useSessionGQL must be used within a SessionProviderGQL');
    }

    return context;
};
