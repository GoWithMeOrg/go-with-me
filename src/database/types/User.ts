import { IRole } from "./Role";

export interface IUser {
    _id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    location: string;
    aboutMe: string;
    interests: string[];
    meetings: string[];
    tags: string[];
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: IRole;
}
