import { User } from '@go-with-me/shared/graphql';

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
