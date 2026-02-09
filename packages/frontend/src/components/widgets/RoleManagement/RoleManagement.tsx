'use client';

import { Action, Resource, Role } from '@/app/types/types';
import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { Input } from '@/components/shared/Input';
import { Label } from '@/components/shared/Label';
import { Title } from '@/components/shared/Title';

import useRoleManager from './hooks/useRoleManager';

import classes from './RoleManagement.module.css';

export const RoleManagement = () => {
    const {
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
    } = useRoleManager();

    if (loading) return <div className={classes.loading}>Loading roles...</div>;
    if (error) return <div className={classes.error}>Error loading roles: {error.message}</div>;

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Title tag="h1">Role Management</Title>
                <Button onClick={handleCreateRole} size="normal">
                    Create New Role
                </Button>
            </div>

            {isFormVisible && (
                <div className={classes.formContainer}>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <div className={classes.formHeader}>
                            <Title tag="h2">{editingRole ? 'Edit Role' : 'Create New Role'}</Title>
                        </div>

                        <div className={classes.formField}>
                            <Label label="Role Name">
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                    placeholder="Enter role name"
                                />
                            </Label>
                        </div>

                        <div className={classes.permissionsSection}>
                            <h3 className={classes.sectionTitle}>Permissions</h3>
                            <div className={classes.permissionsGrid}>
                                <div className={classes.permissionsHeader}>
                                    <div className={classes.resourceHeader}>Resource</div>
                                    {Object.values(Action).map((action) => (
                                        <div key={action} className={classes.actionHeader}>
                                            {action}
                                        </div>
                                    ))}
                                </div>

                                {Object.values(Resource).map((resource) => (
                                    <div key={resource} className={classes.permissionRow}>
                                        <div className={classes.resourceName}>{resource}</div>
                                        {Object.values(Action).map((action) => (
                                            <div
                                                key={`${resource}-${action}`}
                                                className={classes.actionCheckbox}
                                            >
                                                <Checkbox
                                                    id={`${resource}-${action}`}
                                                    checked={
                                                        formData.permissions[resource]?.[action] ||
                                                        false
                                                    }
                                                    onChange={(checked) =>
                                                        handlePermissionChange(
                                                            resource,
                                                            action,
                                                            checked
                                                        )
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={classes.formActions}>
                            <Button type="submit" size="normal">
                                {editingRole ? 'Update Role' : 'Create Role'}
                            </Button>
                            <Button
                                type="button"
                                onClick={handleCancel}
                                className={classes.cancelButton}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className={classes.rolesList}>
                <h2 className={classes.sectionTitle}>Existing Roles</h2>

                {dataRoles?.roles?.length === 0 ? (
                    <div className={classes.emptyState}>
                        No roles found. Create your first role!
                    </div>
                ) : (
                    <div className={classes.rolesGrid}>
                        {dataRoles?.roles?.map((role: Role) => (
                            <div key={role._id} className={classes.roleCard}>
                                <div className={classes.roleHeader}>
                                    <h3 className={classes.roleName}>{role.name}</h3>
                                    <div className={classes.roleActions}>
                                        <Button
                                            onClick={() => handleEditRole(role)}
                                            size="normal"
                                            className={classes.editButton}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteRole(role._id)}
                                            size="normal"
                                            className={classes.deleteButton}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                <div className={classes.rolePermissions}>
                                    <h4 className={classes.permissionsTitle}>Permissions:</h4>
                                    {role.permissions.length === 0 ? (
                                        <div className={classes.noPermissions}>
                                            No permissions assigned
                                        </div>
                                    ) : (
                                        <div className={classes.permissionsList}>
                                            {/* {role.permissions.map((permission, index) => (
                                                <div key={index} className={classes.permissionItem}>
                                                    <span className={classes.permissionResource}>
                                                        {permission.resource}:
                                                        {role.permissions.map(
                                                            (permission, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={
                                                                        classes.permissionItem
                                                                    }
                                                                >
                                                                    <span
                                                                        className={
                                                                            classes.permissionActions
                                                                        }
                                                                    >
                                                                        {permission.action}
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                    </span>
                                                </div>
                                            ))} */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
