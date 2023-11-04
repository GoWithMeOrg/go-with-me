const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://");
const cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token";

export default cookieName;
