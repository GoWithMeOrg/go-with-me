import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client/react';

import { SearchProps, SearchVariables } from '../interfaces/interfaces';

export const useSearchInput = <
    TData,
    TVariables extends SearchVariables = SearchVariables,
    // Вычисляем тип элемента массива автоматически на основе ключа
    TItem = TData[keyof TData] extends (infer U)[] ? U : unknown,
>({
    searchQuery,
    dataKey,
}: SearchProps<TData>) => {
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

    const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const cancelDebouncedLoad = useCallback(() => {
        clearTimeout(timeoutIdRef.current);
    }, []);

    const debouncedLoad = useCallback(
        (query: string) => {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = setTimeout(() => {
                if (query.trim().length < 2) return;

                load({
                    variables: {
                        query,
                    } as TVariables,
                });
            }, 500);
        },
        [load]
    );

    useEffect(() => cancelDebouncedLoad, [cancelDebouncedLoad]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);
        debouncedLoad(inputValue);
    };

    const clearSearch = () => {
        setSearchValue('');
        cancelDebouncedLoad();
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
