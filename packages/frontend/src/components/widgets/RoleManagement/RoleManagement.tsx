'use client';

import { Role } from '@/app/graphql/types';
import ArrowMenu from '@/assets/icons/arrowMenu.svg';
import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { FilteredList } from '@/components/shared/FilteredList';
import { Input } from '@/components/shared/Input';
import { Title } from '@/components/shared/Title';

import useRoleManagement from './hooks/useRoleManagement';

import classes from './RoleManagement.module.css';

export const RoleManagement = () => {
    const {
        dataRoles,
        groupByResource,
        expandedRole,
        toggleRole,
        handleTogglePermission,
        dataPermissions,

        isCreatePanelOpen,
        setIsCreatePanelOpen,

        handleCreateRoleBtn,
        newRoleName,
        setNewRoleName,
        handleSave,
        selectedPerms,
        toggleNewPermission,
        toggleAllResourcePermissions,
    } = useRoleManagement();

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Title tag="h2">Role Management</Title>
            </div>

            <div className={classes.createRoleWrapper}>
                <Button onClick={handleCreateRoleBtn} className={classes.toggleCreateBtn}>
                    {isCreatePanelOpen ? 'Cancel' : 'Create Role'}
                </Button>

                {isCreatePanelOpen && (
                    <div className={classes.createPanel}>
                        <div className={classes.panelHeader}>
                            <Input
                                type="text"
                                placeholder="Enter role name..."
                                value={newRoleName}
                                onChange={(e) => setNewRoleName(e.target.value)}
                                className={classes.roleNameInput}
                            />
                            <Button
                                onClick={handleSave}
                                disabled={!newRoleName || selectedPerms.length === 0}
                            >
                                Save Role
                            </Button>
                        </div>

                        <div className={classes.matrixContainer}>
                            {Object.entries(
                                groupByResource(dataPermissions?.permissions || [])
                            ).map(([resourceName, perms]) => (
                                <div key={resourceName} className={classes.resourceCard}>
                                    <div className={classes.cardHeader}>
                                        <span>{resourceName}</span>
                                        <button
                                            type="button"
                                            className={classes.selectAllBtn}
                                            onClick={() => toggleAllResourcePermissions(perms)}
                                        >
                                            {perms.every((p) => selectedPerms.includes(p._id))
                                                ? 'Deselect'
                                                : 'Select All'}
                                        </button>
                                    </div>
                                    <div className={classes.permsGrid}>
                                        {perms.map((perm) => (
                                            <div key={perm._id} className={classes.permMiniRow}>
                                                <Checkbox
                                                    id={`create-${perm._id}`}
                                                    checked={selectedPerms.includes(perm._id)}
                                                    onChange={() => toggleNewPermission(perm._id)}
                                                />
                                                <span className={classes.actionLabel}>
                                                    {perm.action}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className={classes.resourceList}>
                <FilteredList>
                    {dataRoles?.roles && (
                        <ul>
                            {dataRoles?.roles.map((role: Role) => {
                                const isExpanded = expandedRole.includes(role.name);

                                return (
                                    <li key={role._id} style={{ marginBottom: '1rem' }}>
                                        <div className={classes.accordionItem}>
                                            <div
                                                className={`${classes.accordionHeader} ${isExpanded ? classes.active : ''}`}
                                                onClick={() => toggleRole(role.name)}
                                            >
                                                <div className={classes.accordionTitleGroup}>
                                                    <h3 className={classes.resourceName}>
                                                        Role: {role.name}
                                                    </h3>

                                                    <ArrowMenu
                                                        style={{
                                                            marginRight: '1rem',
                                                            transform: isExpanded
                                                                ? 'rotate(180deg)'
                                                                : 'rotate(0deg)',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className={classes.accordionContent}>
                                                <div className={classes.listHeader}>
                                                    <div>Action</div>
                                                    <div>Permission</div>
                                                    <div>Description</div>
                                                </div>
                                                <div className={classes.accordionContent}>
                                                    {dataPermissions?.permissions &&
                                                        // Группируем права по имени ресурса
                                                        Object.entries(
                                                            groupByResource(
                                                                dataPermissions?.permissions
                                                            )
                                                        ).map(([resourceName, perms]) => (
                                                            <div
                                                                key={resourceName}
                                                                className={
                                                                    classes.resourceGroupWrapper
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        classes.resourceSubHeader
                                                                    }
                                                                >
                                                                    <span
                                                                        className={
                                                                            classes.resourceLabel
                                                                        }
                                                                    >
                                                                        Resource:
                                                                    </span>
                                                                    <span
                                                                        className={
                                                                            classes.resourceName
                                                                        }
                                                                    >
                                                                        {resourceName}
                                                                    </span>
                                                                </div>

                                                                <div>
                                                                    {perms.map((perm) => {
                                                                        // Проверяем, есть ли это право у текущей роли
                                                                        const isAssigned =
                                                                            role.permissions?.some(
                                                                                (p: any) =>
                                                                                    (p._id || p) ===
                                                                                    perm._id
                                                                            );

                                                                        return (
                                                                            <div
                                                                                key={perm._id}
                                                                                className={
                                                                                    classes.permissionRow
                                                                                }
                                                                            >
                                                                                <div>
                                                                                    <span
                                                                                        className={`${classes.actionTag} ${classes[perm.action.toLowerCase()]}`}
                                                                                    >
                                                                                        {
                                                                                            perm.action
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                                <div>
                                                                                    <span
                                                                                        className={
                                                                                            classes.permName
                                                                                        }
                                                                                    >
                                                                                        {perm.name}
                                                                                    </span>
                                                                                </div>
                                                                                <div>
                                                                                    <span>
                                                                                        {perm.description ||
                                                                                            '—'}
                                                                                    </span>
                                                                                </div>

                                                                                <div
                                                                                    className={
                                                                                        classes.colCheckbox
                                                                                    }
                                                                                >
                                                                                    <Checkbox
                                                                                        id={
                                                                                            perm._id
                                                                                        }
                                                                                        checked={
                                                                                            isAssigned
                                                                                        }
                                                                                        onChange={() =>
                                                                                            handleTogglePermission(
                                                                                                role._id,
                                                                                                perm._id,
                                                                                                isAssigned
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </FilteredList>
            </div>
        </div>
    );
};
