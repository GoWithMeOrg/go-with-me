import { useSession } from "next-auth/react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { GET_FIND_USERS } from "@/app/api/graphql/queries/findUsers";
import { GET_COMPANIONS } from "@/app/api/graphql/queries/companions";
import { REMOVE_COMPANION_MUTATION } from "@/app/api/graphql/mutations/companions";
import { COMPANION_REQUEST_MUTATION } from "@/app/api/graphql/mutations/companionRequest";
import { useState } from "react";

export const useCompanions = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;

    const [searchValue, setSearchValue] = useState("");

    const [loadUsers, { loading, error, data, called }] = useLazyQuery(GET_FIND_USERS);

    const {
        loading: errorloading,
        error: errorCompanions,
        data: dataCompanions,
        refetch: refetchCompanions,
    } = useQuery(GET_COMPANIONS, {
        variables: { userId: user_id },
    });

    const findUsers = searchValue ? data?.findUsers || [] : [];

    const companions = dataCompanions?.companions || [];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);

        const isEmail = inputValue.includes("@");
        const variables = isEmail ? { email: inputValue } : { name: inputValue };
        loadUsers({ variables });
    };

    const clearInput = () => {
        setSearchValue("");
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

    const [CompanionRequest] = useMutation(COMPANION_REQUEST_MUTATION);

    const companionRequest = async (id: string) => {
        try {
            await CompanionRequest({
                variables: { senderId: user_id, receiverId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return {
        handleInputChange,
        findUsers,
        companions,
        called,
        removeCompanion,
        companionRequest,
        searchValue,
        clearInput,
    };
};
