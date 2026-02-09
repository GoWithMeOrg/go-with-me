import { useState } from 'react';
import { ADD_PERMISSION_TO_ROLE, REMOVE_PERMISSION_FROM_ROLE } from '@/app/graphql/mutations/role';
import { GET_ALL_PERMISSIONS } from '@/app/graphql/queries/permission';
import { GET_RESOURCES } from '@/app/graphql/queries/resource';
import { GET_ROLES } from '@/app/graphql/queries/role';
import { Permission, Role } from '@/app/graphql/types';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';

const useRoleManagement = () => {
    const [expandedRole, setExpandedRole] = useState<string[]>([]);
    const [expandedPermission, setExpandedPermission] = useState<string[]>([]);

    const { data: dataResources } = useQuery(GET_RESOURCES);

    const { data: dataRoles } = useQuery<{ roles: Role[] }>(GET_ROLES);

    const [loadPermissions, { data: dataPermissions }] = useLazyQuery<{
        permissions: Permission[];
    }>(GET_ALL_PERMISSIONS);

    const [removePermissionFromRole] = useMutation(REMOVE_PERMISSION_FROM_ROLE, {
        refetchQueries: ['GetRoles'],
    });

    const [addPermissionToRole] = useMutation(ADD_PERMISSION_TO_ROLE, {
        refetchQueries: ['GetRoles'],
    });

    const addPermission = async (permissionId: string, roleId: string) => {
        try {
            await addPermissionToRole({
                variables: {
                    permissionId,
                    roleId,
                },
            });
        } catch (error) {
            console.error('Ошибка при добавлении права:', error);
        }
    };

    const removePermission = async (permissionId: string, roleId: string) => {
        try {
            await removePermissionFromRole({
                variables: {
                    permissionId,
                    roleId,
                },
            });
        } catch (error) {
            console.error('Ошибка при удалении права:', error);
        }
    };

    const handleTogglePermission = async (
        roleId: string,
        permissionId: string,
        isAssigned: boolean
    ) => {
        if (isAssigned) {
            removePermission(permissionId, roleId);
        } else {
            await addPermission(permissionId, roleId);
        }
    };

    const groupByResource = (permissions: Permission[]) => {
        if (!permissions) return {};
        return permissions.reduce(
            (acc, perm) => {
                const resourceName = perm.resource?.name || 'Other';
                if (!acc[resourceName]) acc[resourceName] = [];
                acc[resourceName].push(perm);
                return acc;
            },
            {} as Record<string, Permission[]>
        );
    };

    const toggleRole = (role: string) => {
        setExpandedRole((prev) =>
            prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
        );
        loadPermissions();
    };

    return {
        dataRoles,
        dataResources,
        groupByResource,
        expandedRole,
        toggleRole,
        handleTogglePermission,
        addPermission,
        dataPermissions,
        expandedPermission,
    };
};

export default useRoleManagement;
