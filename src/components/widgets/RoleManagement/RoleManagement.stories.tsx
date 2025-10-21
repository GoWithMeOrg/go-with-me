import type { Meta, StoryObj } from "@storybook/nextjs";
import { MockedProvider } from "@apollo/client/testing/react";
import { RoleManagement, GET_ROLES, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE } from "./RoleManagement";

// Mock data for the stories
const mockRoles = [
    {
        _id: "1",
        name: "Admin",
        permissions: [
            {
                resource: "USER",
                actions: ["CREATE", "READ", "UPDATE", "DELETE"],
                __typename: "Permission",
            },
            {
                resource: "EVENT",
                actions: ["CREATE", "READ", "UPDATE", "DELETE"],
                __typename: "Permission",
            },
        ],
        __typename: "Role",
    },
    {
        _id: "2",
        name: "Moderator",
        permissions: [
            {
                resource: "USER",
                actions: ["READ", "UPDATE"],
                __typename: "Permission",
            },
            {
                resource: "EVENT",
                actions: ["CREATE", "READ", "UPDATE"],
                __typename: "Permission",
            },
        ],
        __typename: "Role",
    },
    {
        _id: "3",
        name: "User",
        permissions: [
            {
                resource: "USER",
                actions: ["READ"],
                __typename: "Permission",
            },
            {
                resource: "EVENT",
                actions: ["READ"],
                __typename: "Permission",
            },
        ],
        __typename: "Role",
    },
];

// Create a function to generate mocks (to handle refetch)
const createGetRolesMock = (roles = mockRoles) => ({
    request: {
        query: GET_ROLES,
    },
    result: {
        data: {
            roles,
        },
    },
});

const createRoleMock = {
    request: {
        query: CREATE_ROLE,
    },
    newData: () => ({
        data: {
            createRole: {
                _id: `role-${Date.now()}`,
                name: "New Role",
                permissions: [],
                __typename: "Role",
            },
        },
    }),
};

const updateRoleMock = {
    request: {
        query: UPDATE_ROLE,
    },
    newData: () => ({
        data: {
            updateRole: {
                _id: "1",
                name: "Updated Role",
                permissions: [],
                __typename: "Role",
            },
        },
    }),
};

const deleteRoleMock = {
    request: {
        query: DELETE_ROLE,
    },
    newData: () => ({
        data: {
            deleteRole: true,
        },
    }),
};

// Default mocks - provide multiple GET_ROLES for refetch
const mocks = [
    createGetRolesMock(), // Initial load
    createRoleMock,
    updateRoleMock,
    deleteRoleMock,
    createGetRolesMock(), // After create/update/delete refetch
    createGetRolesMock(), // Additional refetch if needed
];

const meta: Meta<typeof RoleManagement> = {
    title: "Widgets/RoleManagement",
    component: RoleManagement,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "A comprehensive role management component that allows creating, editing, and deleting user roles with granular permission controls.",
            },
        },
    },
    decorators: [
        (Story) => (
            <MockedProvider mocks={mocks} addTypename={true}>
                <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                    <Story />
                </div>
            </MockedProvider>
        ),
    ],
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Default View",
    parameters: {
        docs: {
            description: {
                story: "The default view showing the role management interface with existing roles and the ability to create new ones.",
            },
        },
    },
};

export const EmptyState: Story = {
    name: "Empty State",
    decorators: [
        (Story) => (
            <MockedProvider
                mocks={[
                    createGetRolesMock([]), // Initial load with empty array
                    createRoleMock,
                    createGetRolesMock([]), // After mutation refetch
                ]}
                addTypename={true}
            >
                <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                    <Story />
                </div>
            </MockedProvider>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: "The empty state when no roles exist, encouraging users to create their first role.",
            },
        },
    },
};

export const WithManyRoles: Story = {
    name: "Many Roles",
    decorators: [
        (Story) => {
            const manyRoles = [
                ...mockRoles,
                {
                    _id: "4",
                    name: "Content Manager",
                    permissions: [
                        {
                            resource: "EVENT",
                            actions: ["CREATE", "READ", "UPDATE"],
                            __typename: "Permission",
                        },
                        {
                            resource: "COMMENT",
                            actions: ["READ", "DELETE"],
                            __typename: "Permission",
                        },
                    ],
                    __typename: "Role",
                },
                {
                    _id: "5",
                    name: "Guest",
                    permissions: [
                        {
                            resource: "EVENT",
                            actions: ["READ"],
                            __typename: "Permission",
                        },
                    ],
                    __typename: "Role",
                },
                {
                    _id: "6",
                    name: "Super Admin",
                    permissions: [
                        {
                            resource: "USER",
                            actions: ["CREATE", "READ", "UPDATE", "DELETE"],
                            __typename: "Permission",
                        },
                        {
                            resource: "EVENT",
                            actions: ["CREATE", "READ", "UPDATE", "DELETE"],
                            __typename: "Permission",
                        },
                        {
                            resource: "COMMENT",
                            actions: ["CREATE", "READ", "UPDATE", "DELETE"],
                            __typename: "Permission",
                        },
                        {
                            resource: "ROLE",
                            actions: ["CREATE", "READ", "UPDATE", "DELETE"],
                            __typename: "Permission",
                        },
                    ],
                    __typename: "Role",
                },
            ];

            return (
                <MockedProvider
                    mocks={[
                        createGetRolesMock(manyRoles),
                        createRoleMock,
                        updateRoleMock,
                        deleteRoleMock,
                        createGetRolesMock(manyRoles),
                    ]}
                    addTypename={true}
                >
                    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                        <Story />
                    </div>
                </MockedProvider>
            );
        },
    ],
    parameters: {
        docs: {
            description: {
                story: "A view with many roles to demonstrate how the component handles a larger dataset and grid layout.",
            },
        },
    },
};

export const LoadingState: Story = {
    name: "Loading State",
    decorators: [
        (Story) => (
            <MockedProvider
                mocks={[
                    {
                        request: {
                            query: GET_ROLES,
                        },
                        delay: Infinity, // Better than Promise that never resolves
                    },
                ]}
                addTypename={true}
            >
                <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                    <Story />
                </div>
            </MockedProvider>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: "The loading state while fetching roles from the server.",
            },
        },
    },
};

export const ErrorState: Story = {
    name: "Error State",
    decorators: [
        (Story) => (
            <MockedProvider
                mocks={[
                    {
                        request: {
                            query: GET_ROLES,
                        },
                        error: new Error("Failed to fetch roles"),
                    },
                ]}
                addTypename={true}
            >
                <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                    <Story />
                </div>
            </MockedProvider>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: "The error state when there's a problem fetching roles from the server.",
            },
        },
    },
};
