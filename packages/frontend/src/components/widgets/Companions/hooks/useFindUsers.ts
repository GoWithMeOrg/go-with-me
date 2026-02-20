import { useState } from 'react';
import { GET_FIND_USERS } from '@/app/graphql/queries/findUsers';
import { FIND_BY_EMAIL_OR_NAME } from '@/app/graphql/queries/users';
import { useUserID } from '@/hooks/useUserID';
import { useLazyQuery } from '@apollo/client/react';

export const useFindUsers = () => {
    const { user_id } = useUserID();
    const [searchValue, setSearchValue] = useState('');
    const [loadUsers, { loading, error, data, called, refetch }] =
        useLazyQuery(FIND_BY_EMAIL_OR_NAME);

    const handleFindUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);
        const isEmail = inputValue.includes('@');

        const variables = {
            email: isEmail ? inputValue : null,
            name: isEmail ? null : inputValue,
        };

        loadUsers({
            variables,
        });
    };

    const clearInput = () => setSearchValue('');
    //@ts-ignore
    const findUsers = searchValue ? data?.findByEmailOrName || [] : [];

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
