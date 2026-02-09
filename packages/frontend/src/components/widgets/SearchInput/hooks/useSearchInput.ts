import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { OperationVariables } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';

import { SearchProps } from '../interfaces/interfaces';

export const useSearchInput = <TData, TVariables extends OperationVariables = any>({
    searchQuery,
    dataKey,
}: SearchProps<TData>) => {
    const [searchValue, setSearchValue] = useState('');
    const [load, { data, loading, error, called }] = useLazyQuery<any, TVariables>(searchQuery, {
        fetchPolicy: 'network-only',
    });

    const searchData = useMemo(() => {
        if (!data) return [];

        // 1. Если ключ передан и он есть в данных — берем его
        if (dataKey && data[dataKey]) {
            return data[dataKey];
        }

        // 2. Если ключ неизвестен — ищем ПЕРВЫЙ массив в объекте data
        const firstKeyWithArray = Object.keys(data).find((key) => Array.isArray(data[key]));

        return firstKeyWithArray ? data[firstKeyWithArray] : [];
    }, [data, dataKey]);

    const debouncedLoad = useMemo(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const fn = (inputValue: string) => {
            // отправляем запрос только если 3 и более символов
            if (inputValue.trim().length >= 3) {
                load({
                    variables: {
                        query: inputValue,
                    } as unknown as TVariables,
                });
            }
        };

        const debounced = (query: string) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(query), 500);
        };

        debounced.cancel = () => clearTimeout(timeoutId);
        return debounced;
    }, [load]);

    useEffect(() => {
        return () => debouncedLoad.cancel();
    }, [debouncedLoad]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);
        debouncedLoad(inputValue);
    };

    return {
        handleSearch,
        searchValue,
        searchData,
        loading,
        error,
        called,
    };
};
