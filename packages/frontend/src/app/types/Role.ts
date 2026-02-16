import { Action, Resource } from './Permission';

export type IRole = {
    _id: string;
    role: string;
    permissions: {
        actions: Action[];
        resource: Resource;
    }[];
};
