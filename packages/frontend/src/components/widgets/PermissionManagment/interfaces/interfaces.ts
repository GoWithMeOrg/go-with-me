import { Permission } from '@/app/graphql/types';

export interface Resource {
    _id: string;
    name: string;
    slug: string;
    permissions?: Permission[];
}
