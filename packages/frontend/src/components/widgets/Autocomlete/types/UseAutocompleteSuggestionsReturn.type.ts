export type UseAutocompleteSuggestionsReturn = {
    suggestions: google.maps.places.AutocompleteSuggestion[];
    isLoading: boolean;
    resetSession: () => void;
};
