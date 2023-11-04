import type { NextRequest } from "next/server";
import SessionModel from "@/database/models/Session";

const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://");
const cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token";

const getToken = (request: NextRequest) => {
    const cookie = request.cookies.get(cookieName);
    return cookie?.value;
};

const getUserId = async (request: NextRequest) => {
    const sessionToken = getToken(request);
    const session = await SessionModel.findOne({ sessionToken });

    console.log("session: ", session); // eslint-disable-line

    if (!session) return false;
    // TODO: add check for session expiration

    return session.userId.toString();
};

export { getToken, getUserId };
