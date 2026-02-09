import { useState } from 'react';
import { CREATE_ROLE, REMOVE_ROLE, UPDATE_ROLE } from '@/app/graphql/mutations/role';
import { GET_PERMISSIONS } from '@/app/graphql/queries/permission';
import { GET_ROLES } from '@/app/graphql/queries/role';
import { Action, Permission, Resource, Role } from '@/app/types/types';
import { useMutation, useQuery } from '@apollo/client/react';

interface RoleFormData {
    name: string;
    permissions: { [resource: string]: { [action: string]: boolean } };
}

const useRoleManager = () => {
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const { data: dataRoles, loading, error, refetch } = useQuery<{ roles: Role[] }>(GET_ROLES);
    const { data: dataPermissions } = useQuery<{ permission: Permission[] }>(GET_PERMISSIONS);

    const [createRole] = useMutation(CREATE_ROLE);
    const [updateRole] = useMutation(UPDATE_ROLE);
    const [deleteRole] = useMutation(REMOVE_ROLE);

    // console.log(dataRoles);

    const [formData, setFormData] = useState<RoleFormData>({ name: '', permissions: {} });

    const initializeFormData = (role?: Role) => {
        const permissions: { [resource: string]: { [action: string]: boolean } } = {};

        Object.values(Resource).forEach((resource) => {
            permissions[resource] = {};
            Object.values(Action).forEach((action) => {
                permissions[resource][action] = false;
            });
        });

        // If editing a role, set existing permissions
        if (role) {
            role.permissions.forEach((p) => {
                // p.action теперь строка (напр. "READ"), а не массив
                if (permissions[p.resource]) {
                    permissions[p.resource][p.action] = true;
                }
            });
        }

        setFormData({ name: role?.name || '', permissions });
    };

    const handleCreateRole = () => {
        setEditingRole(null);
        initializeFormData();
        setIsFormVisible(true);
    };

    const handleEditRole = (role: Role) => {
        setEditingRole(role);
        initializeFormData(role);
        setIsFormVisible(true);
    };

    const handleDeleteRole = async (roleId: string) => {
        if (confirm('Are you sure you want to delete this role?')) {
            try {
                await deleteRole({ variables: { id: roleId } });
                refetch();
            } catch (error) {
                console.error('Error deleting role:', error);
                alert('Failed to delete role');
            }
        }
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     // 1. Получаем все разрешения из GraphQL запроса
    //     const allPermissions = dataPermissions?.permission || [];

    //     // 2. Собираем массив ID только для тех прав, где в стейте стоит true
    //     const selectedPermissionIds: string[] = [];

    //     Object.entries(formData.permissions).forEach(([resource, actions]) => {
    //         Object.entries(actions).forEach(([action, isActive]) => {
    //             if (isActive) {
    //                 console.log(`Ищем совпадение для: Resource=${resource}, Action=${action}`);

    //                 const match = allPermissions.find((p) => {
    //                     // Логируем каждое сравнение для первого найденного активного чекбокса
    //                     const isMatch = p.resource === resource && p.action === action;
    //                     return isMatch;
    //                 });

    //                 if (match) {
    //                     selectedPermissionIds.push(match._id);
    //                 } else {
    //                     console.warn(`Право не найдено в базе для: ${resource} ${action}`);
    //                     // Выведем один пример из базы, чтобы сравнить формат
    //                     console.log('Пример объекта из базы:', allPermissions[0]);
    //                 }
    //             }
    //         });
    //     });

    //     console.log(selectedPermissionIds);

    //     // try {
    //     //     if (editingRole) {
    //     //         await updateRole({
    //     //             variables: {
    //     //                 updateRoleInput: {
    //     //                     _id: editingRole._id,
    //     //                     name: formData.name,
    //     //                     permissionIds: selectedPermissionIds, // Используем правильное имя поля
    //     //                 },
    //     //             },
    //     //         });
    //     //     } else {
    //     //         await createRole({
    //     //             variables: {
    //     //                 createRoleInput: {
    //     //                     name: formData.name,
    //     //                     permissionIds: selectedPermissionIds, // Используем правильное имя поля
    //     //                 },
    //     //             },
    //     //         });
    //     //     }
    //     //     setIsFormVisible(false);
    //     //     setEditingRole(null);
    //     //     refetch();
    //     // } catch (error: any) {
    //     //     console.error('Submission Error:', error);
    //     //     alert(error.message);
    //     // }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Важно: используем точное имя массива 'permission' из вашего лога
        const allAvailablePermissions = dataPermissions?.permissions || [];
        const selectedPermissionIds: string[] = [];

        // 2. Перебираем formData
        Object.entries(formData.permissions).forEach(([resourceKey, actions]) => {
            Object.entries(actions).forEach(([actionKey, isActive]) => {
                if (isActive) {
                    // Ищем совпадение.
                    // Используем .toString() на случай, если ключи приходят как Enum-объекты
                    const match = allAvailablePermissions.find(
                        (p) => p.resource === resourceKey && p.action === actionKey
                    );

                    if (match) {
                        selectedPermissionIds.push(match._id);
                    } else {
                        // Это поможет нам увидеть, если где-то есть опечатка
                        console.warn(
                            `Не найдено в БД: Resource="${resourceKey}", Action="${actionKey}"`
                        );
                    }
                }
            });
        });

        console.log('ID для отправки:', selectedPermissionIds);

        if (selectedPermissionIds.length === 0) {
            alert('Пожалуйста, выберите хотя бы одно разрешение.');
            return;
        }

        try {
            const input = {
                name: formData.name,
                permissionIds: selectedPermissionIds,
            };

            if (editingRole) {
                await updateRole({
                    variables: {
                        updateRoleInput: { _id: editingRole._id, ...input },
                    },
                });
            } else {
                await createRole({
                    variables: {
                        createRoleInput: input,
                    },
                });
            }

            setIsFormVisible(false);
            setEditingRole(null);
            refetch(); // Обновляем список ролей
        } catch (error: any) {
            console.error('Apollo Mutation Error:', error);
        }
    };

    const handlePermissionChange = (resource: string, action: string, checked: boolean) => {
        console.log(resource, action, checked);
        setFormData((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [resource]: {
                    ...(prev.permissions[resource] || {}),
                    [action]: checked,
                },
            },
        }));
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setEditingRole(null);
        setFormData({ name: '', permissions: {} });
    };

    return {
        dataRoles,
        loading,
        error,
        handleCreateRole,
        isFormVisible,
        handleSubmit,
        editingRole,
        formData,
        setFormData,
        handlePermissionChange,
        handleCancel,
        handleEditRole,
        handleDeleteRole,
    };
};

export default useRoleManager;
