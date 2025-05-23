import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            // role: IRole;
        } & DefaultSession["user"];
    }
    interface User extends DefaultUser {
        role: IRole;
    }
}
