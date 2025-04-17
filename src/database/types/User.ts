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
    aboutMe: string;
    categories: string[];
    meetings: string[];
    tags: string[];
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: IRole;
}
