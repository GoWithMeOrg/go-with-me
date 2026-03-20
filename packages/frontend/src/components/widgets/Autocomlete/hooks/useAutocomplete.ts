import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAutocompleteSuggestions } from '@/components/widgets/Autocomlete/hooks/useAutocompleteSuggestion';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface useAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.Place | null) => void;
}

export const useAutocomplete = ({ onPlaceSelect }: useAutocompleteProps) => {
    const places = useMapsLibrary('places');
    const [inputValue, setInputValue] = useState<string>('');
    const [isUserTyping, setIsUserTyping] = useState(false);
    const { suggestions, resetSession } = useAutocompleteSuggestions(inputValue, isUserTyping);

    // Reset isUserTyping after input stops changing
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
        setIsUserTyping(true);
        setInputValue((event.target as HTMLInputElement).value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setIsUserTyping(false);
        }, 500);
    }, []);

    const handleSuggestionClick = useCallback(
        async (suggestion: google.maps.places.AutocompleteSuggestion) => {
            if (!places) return;
            if (!suggestion.placePrediction) return;

            const place = suggestion.placePrediction.toPlace();

            await place.fetchFields({
                fields: [
                    'displayName',
                    'viewport',
                    'location',
                    'svgIconMaskURI',
                    'iconBackgroundColor',
                ],
            });

            setIsUserTyping(false);
            setInputValue(suggestion.placePrediction.text.text);

            resetSession();

            onPlaceSelect(place);
        },
        [places, resetSession, onPlaceSelect]
    );

    return {
        inputValue,
        suggestions,
        handleInput,
        handleSuggestionClick,
    };
};
