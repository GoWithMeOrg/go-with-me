export interface AutocompleteProps {
    value?: string;
    onPlaceSelect: (place: google.maps.places.Place | null) => void;
}
