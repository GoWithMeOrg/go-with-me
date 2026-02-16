import { useState } from 'react';
import {
    CREATE_RESOURCE_PERMISSION,
    TOGGLE_PERMISSION_STATUS,
} from '@/app/graphql/mutations/permission';
import { Action, Permission } from '@/app/graphql/types';
import { useMutation } from '@apollo/client/react';

const usePermissionManager = () => {
    const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [expandedResources, setExpandedResources] = useState<string[]>([]);

    const totalActionsCount = Object.keys(Action).length;

    const [createResourcePermissions] = useMutation(CREATE_RESOURCE_PERMISSION, {
        refetchQueries: ['SearchResources'],
    });
    const [togglePermission] = useMutation(TOGGLE_PERMISSION_STATUS);

    const handleCreateResourcePermissions = async (resourceId: string) => {
        try {
            await createResourcePermissions({
                variables: { resourceId },
            });
        } catch (error) {
            console.error('Ошибка при создании прав ресурса:', error);
        }
    };

    const handleToggleActiveStatus = async (permissionId: string) => {
        try {
            await togglePermission({
                variables: { togglePermissionStatusId: permissionId },
            });
        } catch (error) {
            console.error('Ошибка при смене статуса права:', error);
        }
    };

    const toggleResource = (resource: string) => {
        setExpandedResources((prev) =>
            prev.includes(resource) ? prev.filter((r) => r !== resource) : [...prev, resource]
        );
    };

    return {
        isFormVisible,
        editingPermission,

        expandedResources,
        setExpandedResources,
        toggleResource,

        handleCreateResourcePermissions,
        handleToggleActiveStatus,
        totalActionsCount,
    };
};

export default usePermissionManager;
