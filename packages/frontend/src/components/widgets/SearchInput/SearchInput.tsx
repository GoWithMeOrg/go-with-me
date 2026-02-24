'use client';

import ClearInput from '@/assets/icons/clearInput.svg';
import Search from '@/assets/icons/search.svg';
import { Label } from '@/components/shared/Label';

import { SearchInputProps, SearchVariables } from './interfaces/interfaces';

import classes from './SearchInput.module.css';

export const SearchInput = <TData, TVariables extends SearchVariables>({
    error,
    placeholder,
    onChange,
    loading,
    value = '',
    onClear,
    label,
}: SearchInputProps<TData, TVariables>) => {
    const showClearIcon = value.length > 0 && !loading;

    return (
        <div className={classes.container}>
            <Label label={label as string} className={classes.findCompanions}>
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
            </Label>
        </div>
    );
};
