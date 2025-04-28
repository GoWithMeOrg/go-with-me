import { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authCommonOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async session({ session, user }: { session: Session; user: User }) {
            console.log(user);
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            };
        },
    },
};
