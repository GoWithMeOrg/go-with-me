import { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authCommonOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // Add user id to session
        async session({ session, user }: { session: Session; user: User }) {
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
