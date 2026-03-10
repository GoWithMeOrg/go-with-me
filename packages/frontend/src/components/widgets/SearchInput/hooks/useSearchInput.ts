import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client/react';

import { SearchProps, SearchVariables } from '../interfaces/interfaces';

export const useSearchInput = <
    TData,
    TVariables extends SearchVariables = SearchVariables,
    // Вычисляем тип элемента массива автоматически на основе ключа
    TItem = TData[keyof TData] extends (infer U)[] ? U : any,
>({
    searchQuery,
    dataKey,
}: SearchProps<TData, TItem>) => {
    const [searchValue, setSearchValue] = useState('');

    // Типизируем lazy query: TData — это объект ответа, TVariables — входные параметры
    const [load, { data, loading, error, called }] = useLazyQuery<TData, TVariables>(searchQuery, {
        fetchPolicy: 'network-only',
    });

    // Извлекаем данные по ключу. Приводим к TItem[], так как мы уверены в структуре.
    const searchData = useMemo((): TItem[] => {
        // Теперь TS понимает, что data[dataKey] — это массив TItem
        return (data?.[dataKey] as unknown as TItem[]) || [];
    }, [data, dataKey]);
    const debouncedLoad = useMemo(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const fn = (inputValue: string) => {
            if (inputValue.trim().length >= 2) {
                load({
                    variables: {
                        query: inputValue,
                    } as TVariables,
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

    const clearSearch = () => {
        setSearchValue('');
        debouncedLoad.cancel();
    };

    // Возвращаем данные только если введено 2+ символа
    const filteredSearchData = searchValue.trim().length >= 2 ? searchData : [];

    return {
        handleSearch,
        clearSearch,
        searchValue,
        searchData: filteredSearchData, // Здесь будет тип TItem[]
        loading,
        error,
        called,
    };
};
