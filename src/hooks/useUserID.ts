import { useSession } from "next-auth/react";

export const useUserID = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;

    return { user_id };
};
