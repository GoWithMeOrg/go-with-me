import { FC, InputHTMLAttributes } from 'react';

import classes from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ onChange, className, value, ...rest }) => {
    const inputCss = [classes.input, className].filter(Boolean).join(' ');

    return <input className={inputCss} onChange={onChange} {...rest} />;
};

Input.displayName = 'Input';

export default Input;
