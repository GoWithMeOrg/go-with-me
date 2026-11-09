import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { Action } from '@go-with-me/shared/graphql';

import {
    CREATE_RESOURCE_PERMISSION,
    TOGGLE_PERMISSION_STATUS,
} from '@/app/graphql/mutations/permission';

const usePermissionManager = () => {
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
        expandedResources,
        setExpandedResources,
        toggleResource,

        handleCreateResourcePermissions,
        handleToggleActiveStatus,
        totalActionsCount,
    };
};

export default usePermissionManager;
