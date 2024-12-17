import { IUser } from "./User";

export interface IListInput {
    name: string;
    description: string;
    users_id: string[];
    users: IUser[];
}
