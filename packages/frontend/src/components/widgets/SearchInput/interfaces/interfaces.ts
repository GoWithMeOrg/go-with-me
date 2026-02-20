import { ChangeEvent, InputHTMLAttributes } from 'react';
import { DocumentNode, OperationVariables } from '@apollo/client';

export interface SearchProps<TData> {
    searchQuery: DocumentNode;
    dataKey?: keyof TData;
}

export interface SearchVariables extends OperationVariables {
    search: string;
}

// export interface SearchInputProps<
//     TData = any,
//     TVariables extends SearchVariables = any,
// > extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
//     error?: boolean;
//     searchQuery: DocumentNode; // Делаем обязательным, чтобы избежать ошибки Apollo
//     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     loading?: boolean;
// }

export interface SearchInputProps<
    TData = any,
    TVariables extends SearchVariables = any,
> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    error?: boolean;
    searchQuery: DocumentNode;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void; // ← Добавить
    value?: string; // ← Добавить
    loading?: boolean;
}
