import { PermissionManagement } from '@/components/widgets/PermissionManagment/PermissionManagment';
import { RoleManagement } from '@/components/widgets/RoleManagement';

const RoleManagementPage = () => {
    return (
        <div style={{ gridColumn: '2 / span 10' }}>
            <RoleManagement />
        </div>
    );
};

export default RoleManagementPage;
