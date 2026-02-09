'use client';

import Search from '@/assets/icons/search.svg';

import { SearchInputProps, SearchVariables } from './interfaces/interfaces';

import classes from './SearchInput.module.css';

export const SearchInput = <TData, TVariables extends SearchVariables>({
    error,
    placeholder,
    onChange,
    loading,
}: SearchInputProps<TData, TVariables>) => {
    // Передаем всё в хук. Хук теперь возвращает данные, если они понадобятся для выпадающего списка

    if (loading) return <div className={classes.loading}>Loading permission...</div>;
    if (error) return <div className={classes.error}>Error loading permission</div>;

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <input
                    className={`${classes.input} ${error ? classes.error : ''}`}
                    onChange={onChange}
                    // value={value}
                    placeholder={placeholder}
                />
                {/* Показываем иконку или лоадер прямо в поле */}
                {loading ? (
                    <div className={classes.spinner} />
                ) : (
                    <Search className={classes.icon} />
                )}
            </div>

            {error && <div className={classes.errorMessage}>Error loading data</div>}
        </div>
    );
};
