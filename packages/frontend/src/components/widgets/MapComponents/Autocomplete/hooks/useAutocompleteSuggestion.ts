import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

import { UseAutocompleteSuggestionsReturn } from '@/components/widgets/MapComponents/Autocomplete/types/UseAutocompleteSuggestionsReturn.type';

type SuggestionsResult = {
    input: string;
    suggestions: google.maps.places.AutocompleteSuggestion[];
};

// Стабильная ссылка: новый объект в дефолтном параметре ломал бы зависимости эффекта
const DEFAULT_REQUEST_OPTIONS: Partial<google.maps.places.AutocompleteRequest> = {};

export function useAutocompleteSuggestions(
    inputString: string,
    isUserTyping: boolean,
    requestOptions: Partial<google.maps.places.AutocompleteRequest> = DEFAULT_REQUEST_OPTIONS
): UseAutocompleteSuggestionsReturn {
    const places = useMapsLibrary('places');

    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
    const isPlaceSelectedRef = useRef(false);

    // Результат запроса вместе со строкой, для которой он получен —
    // так загрузка вычисляется без setState внутри эффекта.
    const [result, setResult] = useState<SuggestionsResult>({ input: '', suggestions: [] });

    useEffect(() => {
        if (!places) return;

        if (isUserTyping) {
            isPlaceSelectedRef.current = false;
        }

        if (isPlaceSelectedRef.current) return;

        const { AutocompleteSessionToken, AutocompleteSuggestion } = places;

        if (!sessionTokenRef.current) {
            sessionTokenRef.current = new AutocompleteSessionToken();
        }

        if (inputString === '') return;

        let cancelled = false;

        AutocompleteSuggestion.fetchAutocompleteSuggestions({
            ...requestOptions,
            input: inputString,
            sessionToken: sessionTokenRef.current,
        })
            .then((res) => {
                if (!cancelled) setResult({ input: inputString, suggestions: res.suggestions });
            })
            .catch(() => {
                if (!cancelled) setResult({ input: inputString, suggestions: [] });
            });

        return () => {
            cancelled = true;
        };
    }, [places, inputString, isUserTyping, requestOptions]);

    const resetSession = useCallback(() => {
        sessionTokenRef.current = null;
        setResult({ input: inputString, suggestions: [] });
        isPlaceSelectedRef.current = true;
    }, [inputString]);

    const suggestions = result.input === inputString ? result.suggestions : [];
    const isLoading = places !== undefined && inputString !== '' && result.input !== inputString;

    return { suggestions, isLoading, resetSession };
}
