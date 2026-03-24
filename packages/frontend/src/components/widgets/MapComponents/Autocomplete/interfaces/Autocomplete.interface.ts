import { PlaceType } from '@/components/widgets/MapComponents/types/types';

export interface AutocompleteProps {
    value?: string;
    onPlaceSelect: (place: PlaceType) => void;
}
