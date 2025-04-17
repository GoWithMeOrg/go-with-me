import { IRole } from "./Role";

export interface IUser {
    _id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    location: {
        type: "Point";
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    description: string;
    categories: string[];
    types: string[];
    tags: string[];
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: IRole;
}
