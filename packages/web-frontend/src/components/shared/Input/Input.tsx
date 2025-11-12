import { FC, InputHTMLAttributes } from 'react';

import classes from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ className, error, onChange, ...rest }) => {
  const inputCss = [classes.input, className].filter(Boolean).join(' ');

  return <input className={inputCss} {...rest} onChange={onChange} />;
};

Input.displayName = 'Input';

export default Input;
