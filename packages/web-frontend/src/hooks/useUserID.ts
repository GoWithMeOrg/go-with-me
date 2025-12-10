import { useSession } from 'next-auth/react';

export const useUserID = () => {
    const dataSession = useSession();
    //@ts-ignore
    const user_id = session?.user.id;

    return { user_id, status: dataSession?.status };
};
