export interface AutocompleteProps {
    onPlaceSelect: (place: google.maps.places.Place | null) => void;
    address?: string;
}
