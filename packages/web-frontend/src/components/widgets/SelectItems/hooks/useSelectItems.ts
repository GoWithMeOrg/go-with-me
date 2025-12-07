import { useEffect, useRef, useState } from 'react';

interface IUseSelectItems {
  onChange: (value: string[]) => void;
}

export const useSelectItems = ({ onChange }: IUseSelectItems) => {
  const [items, setItems] = useState<string[]>([]);
  const prevItemsRef = useRef<string[]>(items);

  useEffect(() => {
    if (prevItemsRef.current !== items) {
      onChange(items);
      prevItemsRef.current = items;
    }
  }, [items, onChange]);

  const handleItemChange = (selectedItem: string[]) => {
    setItems(selectedItem);
  };

  return {
    items,
    setItems,
    handleItemChange,
  };
};
