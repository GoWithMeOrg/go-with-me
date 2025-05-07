import { useLazyQuery, useQuery } from "@apollo/client";

import { GET_FIND_USERS } from "@/app/api/graphql/queries/findUsers";
import { GET_COMPANIONS } from "@/app/api/graphql/queries/companions";
import { useSession } from "next-auth/react";

export const useCompanions = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;

    //TODO: добавить функию быстрой очитски полей и сброса кэша
    //TODO: добавить кнопки добавлени/удаления пользователя из друзей
    //TODO: добавить красную точку при появлении уведомлений

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

    return {
        handleFirstNameChange,
        handleLastNameChange,
        handleEmailChange,
        findUsers,
        companions,
        called,
    };
};
