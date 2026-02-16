'use client';

import { PermissionManagement } from '@/components/widgets/PermissionManagment/PermissionManagment';

import { useAdminGuard } from '../hooks/useAdminGuard';

const PermissionPage = () => {
    const { hasAdminRole, isLoading } = useAdminGuard();

    if (isLoading) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Загрузка...</div>;
    }

    if (!hasAdminRole) {
        return null; // Редирект происходит в хуке
    }

    return <PermissionManagement />;
};

export default PermissionPage;
