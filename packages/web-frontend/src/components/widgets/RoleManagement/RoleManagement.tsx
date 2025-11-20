'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { Input } from '@/components/shared/Input';
import { Label } from '@/components/shared/Label';
import { Title } from '@/components/shared/Title';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { Action, Resource, IRole } from '@go-with-me/backend/src/types';

import classes from './RoleManagement.module.css';

// GraphQL queries and mutations
export const GET_ROLES = gql`
  query GetRoles {
    roles {
      _id
      name
      permissions {
        actions
        resource
      }
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation CreateRole($role: RoleInput!) {
    createRole(role: $role) {
      _id
      name
      permissions {
        actions
        resource
      }
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: ID!, $role: RoleInput!) {
    updateRole(id: $id, role: $role) {
      _id
      name
      permissions {
        actions
        resource
      }
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: ID!) {
    deleteRole(id: $id)
  }
`;

interface RoleFormData {
  name: string;
  permissions: { [resource: string]: { [action: string]: boolean } };
}

export const RoleManagement = () => {
  const [editingRole, setEditingRole] = useState<IRole | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_ROLES);
  const [createRole] = useMutation(CREATE_ROLE);
  const [updateRole] = useMutation(UPDATE_ROLE);
  const [deleteRole] = useMutation(DELETE_ROLE);

  const [formData, setFormData] = useState<RoleFormData>({ name: '', permissions: {} });

  const initializeFormData = (role?: IRole) => {
    const permissions: { [resource: string]: { [action: string]: boolean } } = {};

    // Initialize all resources and actions as false
    Object.values(Resource).forEach((resource) => {
      permissions[resource] = {};
      Object.values(Action).forEach((action) => {
        permissions[resource][action] = false;
      });
    });

    // If editing a role, set existing permissions
    if (role) {
      role.permissions.forEach((permission) => {
        permission.actions.forEach((action) => {
          permissions[permission.resource][action] = true;
        });
      });
    }

    setFormData({ name: role?.name || '', permissions });
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    initializeFormData();
    setIsFormVisible(true);
  };

  const handleEditRole = (role: IRole) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert form data to GraphQL format
    const permissions = Object.entries(formData.permissions)
      .map(([resource, actions]) => {
        const activeActions = Object.entries(actions)
          .filter(([, isActive]) => isActive)
          .map(([action]) => action);

        if (activeActions.length > 0) {
          return { resource: resource as Resource, actions: activeActions as Action[] };
        }
        return null;
      })
      .filter(Boolean);

    const roleInput = { name: formData.name, permissions };

    try {
      if (editingRole) {
        await updateRole({ variables: { id: editingRole._id, role: roleInput } });
      } else {
        await createRole({ variables: { role: roleInput } });
      }
      setIsFormVisible(false);
      setEditingRole(null);
      refetch();
    } catch (error) {
      console.error('Error saving role:', error);
      alert('Failed to save role');
    }
  };

  const handlePermissionChange = (resource: string, action: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [resource]: { ...prev.permissions[resource], [action]: checked },
      },
    }));
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingRole(null);
    setFormData({ name: '', permissions: {} });
  };

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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      <div key={`${resource}-${action}`} className={classes.actionCheckbox}>
                        <Checkbox
                          id={`${resource}-${action}`}
                          checked={formData.permissions[resource]?.[action] || false}
                          onChange={(checked) => handlePermissionChange(resource, action, checked)}
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
              <Button type="button" onClick={handleCancel} className={classes.cancelButton}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className={classes.rolesList}>
        <h2 className={classes.sectionTitle}>Existing Roles</h2>
        {data?.roles?.length === 0 ? (
          <div className={classes.emptyState}>No roles found. Create your first role!</div>
        ) : (
          <div className={classes.rolesGrid}>
            {data?.roles?.map((role: IRole) => (
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
                    <div className={classes.noPermissions}>No permissions assigned</div>
                  ) : (
                    <div className={classes.permissionsList}>
                      {role.permissions.map((permission, index) => (
                        <div key={index} className={classes.permissionItem}>
                          <span className={classes.permissionResource}>{permission.resource}:</span>
                          <span className={classes.permissionActions}>
                            {permission.actions.join(', ')}
                          </span>
                        </div>
                      ))}
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
