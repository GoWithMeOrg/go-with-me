import { User } from '@/app/graphql/types';

export interface IList {
    _id?: string;
    author_id: string;
    name: string;
    description: string;
    users_id: string[];
}

export interface IListInput {
    name: string;
    description: string;
    users_id: string[];
    users: User[];
}
