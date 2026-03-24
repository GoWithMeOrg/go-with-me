import { LocationType } from '@/components/widgets/MapComponents/types/types';

export interface UseLocationPickerProps {
    locationData?: LocationType;
    onChange?: (location: LocationType) => void;
}
