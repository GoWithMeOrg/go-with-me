import { PermissionManagement } from '@/components/widgets/PermissionManagment/PermissionManagment';
import { RoleManagement } from '@/components/widgets/RoleManagement';

const RoleManagementPage = () => {
    return (
        <div style={{ gridColumnStart: '2' }}>
            <RoleManagement />
            <PermissionManagement />
        </div>
    );
};

export default RoleManagementPage;
