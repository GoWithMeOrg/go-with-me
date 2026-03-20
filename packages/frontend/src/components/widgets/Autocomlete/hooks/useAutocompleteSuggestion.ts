import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

import { UseAutocompleteSuggestionsReturn } from '../types/UseAutocompleteSuggestionsReturn.type';

export function useAutocompleteSuggestions(
    inputString: string,
    isUserTyping: boolean,
    requestOptions: Partial<google.maps.places.AutocompleteRequest> = {}
): UseAutocompleteSuggestionsReturn {
    const placesLib = useMapsLibrary('places');

    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
    const isPlaceSelectedRef = useRef(false);

    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!placesLib) return;

        if (isUserTyping) {
            isPlaceSelectedRef.current = false;
        }

        if (isPlaceSelectedRef.current) return;

        const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;

        if (!sessionTokenRef.current) {
            sessionTokenRef.current = new AutocompleteSessionToken();
        }

        if (inputString === '') {
            setSuggestions((prev) => (prev.length > 0 ? [] : prev));
            return;
        }

        let cancelled = false;
        setIsLoading(true);

        AutocompleteSuggestion.fetchAutocompleteSuggestions({
            ...requestOptions,
            input: inputString,
            sessionToken: sessionTokenRef.current,
        })
            .then((res) => {
                if (!cancelled) {
                    setSuggestions(res.suggestions);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [placesLib, inputString, isUserTyping, requestOptions]);

    const resetSession = useCallback(() => {
        sessionTokenRef.current = null;
        setSuggestions([]);
        isPlaceSelectedRef.current = true;
    }, []);

    return { suggestions, isLoading, resetSession };
}
