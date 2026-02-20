'use client';

import ClearInput from '@/assets/icons/clearInput.svg';
import Search from '@/assets/icons/search.svg';

import { SearchInputProps, SearchVariables } from './interfaces/interfaces';

import classes from './SearchInput.module.css';

export const SearchInput = <TData, TVariables extends SearchVariables>({
    error,
    placeholder,
    onChange,
    loading,
    value = '', // ← Добавить value
    onClear, // ← Добавить onClear
}: SearchInputProps<TData, TVariables>) => {
    const showClearIcon = value.length > 0 && !loading;

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <input
                    className={`${classes.input} ${error ? classes.error : ''}`}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                />
                {loading ? (
                    <div className={classes.spinner} />
                ) : showClearIcon ? (
                    <ClearInput
                        className={classes.icon}
                        onClick={onClear}
                        style={{ cursor: 'pointer' }}
                    />
                ) : (
                    <Search className={classes.icon} />
                )}
            </div>
            {error && <div className={classes.errorMessage}>Error loading data</div>}
        </div>
    );
};
