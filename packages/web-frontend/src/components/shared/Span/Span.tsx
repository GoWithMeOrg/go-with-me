import React, { FC, HTMLAttributes, useMemo } from 'react';

import classes from './Span.module.css';

export interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
  title: string;
}
export const Span: FC<SpanProps> = ({ title, className }) => {
  const spanCssString: string = useMemo(() => {
    let cssString = '';
    cssString += classes.span;
    if (className) cssString += ' ' + className;
    return cssString;
  }, [className]);

  return <span className={spanCssString}>{title}</span>;
};

export default Span;
