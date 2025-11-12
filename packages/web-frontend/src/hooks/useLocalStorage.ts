import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  // При монтировании получаем значение из localStorage
  useEffect(() => {
    const json = window?.localStorage?.getItem(key);
    if (json) {
      setValue(JSON.parse(json));
    }
  }, [key]);

  // Обновляем значение в localStorage при изменении
  useEffect(() => {
    window?.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
