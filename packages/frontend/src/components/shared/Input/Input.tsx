import { FC, FormEvent, InputHTMLAttributes } from 'react';

import classes from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ onChange, className, value, defaultValue, ...rest }) => {
    const inputCss = [classes.input, className].filter(Boolean).join(' ');

    const inputProps: React.ComponentProps<'input'> = {
        className: inputCss,
        onChange,
        ...rest,
    };

    // Controlled component: use value if explicitly provided
    if (value !== undefined) {
        inputProps.value = value;
    } else if (defaultValue !== undefined) {
        // Uncontrolled component: use defaultValue if provided
        inputProps.defaultValue = defaultValue;
    }

    return <input {...inputProps} />;
};

Input.displayName = 'Input';

export default Input;
