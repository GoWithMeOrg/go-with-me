import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";

import { GET_FIND_USERS } from "@/app/api/graphql/queries/findUsers";
import { useUserID } from "@/hooks/useUserID";

export const useFindUsers = () => {
    const { user_id } = useUserID();
    const [searchValue, setSearchValue] = useState("");
    const [loadUsers, { loading, error, data, called, refetch }] = useLazyQuery(GET_FIND_USERS);

    const handleFindUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);
        const isEmail = inputValue.includes("@");
        const variables = {
            user_id,
            ...(isEmail ? { email: inputValue } : { name: inputValue }),
        };
        loadUsers({ variables });
    };

    const clearInput = () => setSearchValue("");
    const findUsers = searchValue ? data?.findUsers || [] : [];

    return {
        searchValue,
        setSearchValue,
        handleFindUsers,
        clearInput,
        findUsers,
        loading,
        error,
        called,
        refetch,
    };
};
