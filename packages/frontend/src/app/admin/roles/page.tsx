'use client';

import Spinner from '@/assets/icons/spinner.svg';
import { RoleManagement } from '@/components/widgets/RoleManagement';

import { useAdminGuard } from '../hooks/useAdminGuard';

const RoleManagementPage = () => {
    const { hasAdminRole, isLoading } = useAdminGuard();

    if (isLoading) {
        return <Spinner />;
    }

    if (!hasAdminRole) {
        return null; // Редирект происходит в хуке
    }

    return (
        <div style={{ gridColumn: '2 / span 10' }}>
            <RoleManagement />
        </div>
    );
};

export default RoleManagementPage;
