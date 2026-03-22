import { LocationType } from '@/components/widgets/MapComponents/types/types';

export interface LocationPickerProps {
    locationData?: LocationType;
    onChange?: (location: LocationType) => void;
}
