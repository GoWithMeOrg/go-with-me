import { FC } from 'react';

interface FilteredListProps {
  children: React.ReactNode;
  className: string;
}

export const FilteredList: FC<FilteredListProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
