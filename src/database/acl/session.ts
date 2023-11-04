import type { NextRequest } from "next/server";

import SessionModel from "@/database/models/Session";
import cookieName from "@/options/sessionCookieName";

const getToken = (request: NextRequest) => {
    const cookie = request.cookies.get(cookieName);
    return cookie?.value;
};

const getUserId = async (request: NextRequest) => {
    const sessionToken = getToken(request);
    const session = await SessionModel.findOne({ sessionToken });
    if (!session) return false;
    // TODO: add check for session expiration

    return session.userId.toString();
};

export { getToken, getUserId };
