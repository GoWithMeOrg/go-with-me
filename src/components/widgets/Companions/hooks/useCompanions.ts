import { useSession } from "next-auth/react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { GET_FIND_USERS } from "@/app/api/graphql/queries/findUsers";
import { GET_COMPANIONS } from "@/app/api/graphql/queries/companions";
import { REMOVE_COMPANION_MUTATION } from "@/app/api/graphql/mutations/companions";
import { usePublicProfile } from "@/app/profile/[user_id]/public/hooks";

export const useCompanions = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;
    const { companionRequest } = usePublicProfile();

    //TODO: добавить функию быстрой очитски полей и сброса кэша
    //TODO: добавить кнопки добавлени/удаления пользователя из друзей
    //TODO: добавить красную точку при появлении уведомлений
    //TODO: добавить интервал обновления увведомлений

    const [loadUsers, { loading, error, data, called }] = useLazyQuery(GET_FIND_USERS);

    const {
        loading: errorloading,
        error: errorCompanions,
        data: dataCompanions,
        refetch: refetchCompanions,
    } = useQuery(GET_COMPANIONS, {
        variables: { userId: user_id },
    });

    const findUsers = data?.findUsers || [];
    const companions = dataCompanions?.companions || [];

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        loadUsers({ variables: { name: `${e.target.value}` } });
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        loadUsers({ variables: { name: `${e.target.value}` } });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        loadUsers({ variables: { email: `${e.target.value}` } });
    };

    const [RemoveCompanion] = useMutation(REMOVE_COMPANION_MUTATION);

    const removeCompanion = async (id: string) => {
        try {
            await RemoveCompanion({
                variables: { userId: user_id, companionId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        refetchCompanions();
    };

    return {
        handleFirstNameChange,
        handleLastNameChange,
        handleEmailChange,
        findUsers,
        companions,
        called,
        removeCompanion,
        companionRequest,
    };
};
