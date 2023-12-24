import SessionModel from "@/database/models/Session";
import cookieName from "@/options/sessionCookieName";

export type WithCookiesAPI = { cookies: Map<string, { value: string }> };

const getToken = (request: WithCookiesAPI) => {
    const cookie = request.cookies.get(cookieName);
    return cookie?.value;
};

const getUserId = async (request: WithCookiesAPI) => {
    const sessionToken = getToken(request);
    const session = await SessionModel.findOne({ sessionToken });
    if (!session) return false;
    // TODO: add check for session expiration

    return session.userId.toString();
};

export { getToken, getUserId };
