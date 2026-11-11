import { Permission } from '@go-with-me/shared/graphql';

export interface Resource {
    _id: string;
    name: string;
    slug: string;
    permissions?: Permission[];
}
