import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
    const [value, setValue] = useState<T>(initial);

    // При монтировании получаем значение из localStorage.
    // Чтение обязано быть в эффекте: в рендере на сервере localStorage недоступен,
    // а ленивое чтение в useState дало бы hydration mismatch.
    useEffect(() => {
        const json = window?.localStorage?.getItem(key);
        if (!json) return;

        try {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- синхронизация с внешним хранилищем
            setValue(JSON.parse(json) as T);
        } catch {
            // повреждённое значение игнорируем и оставляем initial
        }
    }, [key]);

    // Обновляем значение в localStorage при изменении
    useEffect(() => {
        window?.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}
