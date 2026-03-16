import { ChangeEvent, InputHTMLAttributes } from 'react';
import { DocumentNode, OperationVariables } from '@apollo/client';

export interface SearchProps<TData, TItem> {
    searchQuery: DocumentNode;
    dataKey: keyof TData; // Ключ обязателен
}

export interface SearchVariables extends OperationVariables {
    query: string;
}

export interface SearchInputProps<
    TData = any,
    TVariables extends SearchVariables = any,
> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    error?: boolean;
    searchQuery: DocumentNode;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    value?: string;
    loading?: boolean;
    label?: string;
}
