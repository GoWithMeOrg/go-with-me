'use client';

import { useEffect } from 'react';
import { GET_ROLES_BY_USER_ID } from '@/app/graphql/queries/role';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import { useQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';

export function useAdminGuard() {
    const { data, status } = useSessionGQL();
    const router = useRouter();

    const { data: dataRoles, loading: rolesLoading } = useQuery(GET_ROLES_BY_USER_ID, {
        variables: { userId: data?._id },
        skip: !data?._id,
        fetchPolicy: 'network-only',
    });

    const hasAdminRole = dataRoles?.roleByUserId?.roles.some((role: any) =>
        typeof role === 'string' ? role === 'admin' : role?.name === 'admin'
    );

    console.log(dataRoles);

    useEffect(() => {
        // 1. Ждем, пока загрузится сессия
        if (status === 'loading') return;

        // 2. Если не авторизован — на логин
        if (status === 'unauthenticated' || !data) {
            router.push('/events');
            return;
        }

        // 3. Ждем, пока загрузятся роли из БД
        if (rolesLoading) return;

        // 4. И ТОЛЬКО ТЕПЕРЬ проверяем роль
        if (!dataRoles && !hasAdminRole) {
            router.push('/events');
        }
    }, [status, data, dataRoles, rolesLoading, hasAdminRole, router]);

    return { hasAdminRole, isLoading: status === 'loading' };
}
