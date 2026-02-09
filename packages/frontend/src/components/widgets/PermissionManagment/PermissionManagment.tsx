'use client';

import { SEARCH_RESOURCES } from '@/app/graphql/queries/search';
import ArrowMenu from '@/assets/icons/arrowMenu.svg';
import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { FilteredList } from '@/components/shared/FilteredList';
import { Title } from '@/components/shared/Title';

import { SearchInput } from '../SearchInput';
import { useSearchInput } from '../SearchInput/hooks/useSearchInput';
import usePermissionManager from './hooks/usePermissionManager';
import { Resource } from './interfaces/interfaces';

import classes from './PermissionManagement.module.css';

export const PermissionManagement = () => {
    const {
        expandedResources,
        toggleResource,

        handleToggleActiveStatus,
        handleCreateResourcePermissions,
        totalActionsCount,
    } = usePermissionManager();

    const { handleSearch, searchData } = useSearchInput<any>({
        searchQuery: SEARCH_RESOURCES,
    });

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Title tag="h2">Permission Management</Title>
            </div>

            <div className={classes.resourceList}>
                <SearchInput
                    searchQuery={SEARCH_RESOURCES}
                    placeholder="search..."
                    onChange={handleSearch}
                />
                <FilteredList>
                    {searchData.length > 0 && (
                        <ul>
                            {searchData.map((resource: Resource) => {
                                const isExpanded = expandedResources.includes(resource.name);

                                return (
                                    <li key={resource._id} style={{ width: '600px' }}>
                                        <div className={classes.accordionItem}>
                                            <div
                                                className={`${classes.accordionHeader} ${isExpanded ? classes.active : ''}`}
                                                onClick={() => toggleResource(resource.name)}
                                            >
                                                <div className={classes.accordionTitleGroup}>
                                                    <h3 className={classes.resourceName}>
                                                        Resource: {resource.name}
                                                    </h3>
                                                    {!isExpanded && (
                                                        <span className={classes.badge}>
                                                            {
                                                                resource?.permissions?.filter(
                                                                    (p) => p.isActive
                                                                ).length
                                                            }{' '}
                                                            permissions
                                                        </span>
                                                    )}

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
                                                    <div>
                                                        {(resource?.permissions?.length ?? 0) <
                                                            totalActionsCount && (
                                                            <Button
                                                                onClick={() =>
                                                                    handleCreateResourcePermissions(
                                                                        resource._id
                                                                    )
                                                                }
                                                            >
                                                                Add Permissions
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    {resource?.permissions?.map((perm) => (
                                                        <div
                                                            key={perm._id}
                                                            className={classes.permissionRow}
                                                        >
                                                            <div>
                                                                <span
                                                                    className={`${classes.actionTag} ${classes[perm.action.toLowerCase()]}`}
                                                                >
                                                                    {perm.action}
                                                                </span>
                                                            </div>

                                                            <div>
                                                                <span className={classes.permName}>
                                                                    {perm.name}
                                                                </span>
                                                            </div>

                                                            <div>
                                                                <span>
                                                                    {perm.description || '—'}
                                                                </span>
                                                            </div>

                                                            <div className={classes.colCheckbox}>
                                                                <Checkbox
                                                                    id={perm._id}
                                                                    checked={
                                                                        !!perm?.isActive || false
                                                                    }
                                                                    onChange={() =>
                                                                        handleToggleActiveStatus(
                                                                            perm._id
                                                                        )
                                                                    }
                                                                />
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
