import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';

export const useUserID = () => {
    const { data, status } = useSessionGQL();
    const user_id = data?._id;

    return { user_id, status };
};
