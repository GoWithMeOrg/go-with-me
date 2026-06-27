import { ImageSizeKey } from './constants';

export interface CardEventCoverProps {
    id: string;
    image?: string;
    name: string;
    size: ImageSizeKey;
    priority?: boolean;
}
