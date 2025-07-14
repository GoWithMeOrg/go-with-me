import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_FIND_USERS } from "@/app/api/graphql/queries/findUsers";
import { useSession } from "next-auth/react";

export const useFindUsers = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;
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
