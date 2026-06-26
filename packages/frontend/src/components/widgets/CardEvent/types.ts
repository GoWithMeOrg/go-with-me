export enum SizeCard {
    M = 'medium',
    ML = 'medium-large',
    L = 'large',
    SL = 'small-large',
    S = 'small',
}

export interface CardEventProps {
    id: string;
    name: string;
    description: string;
    coord?: [number, number];
    startDate: string | Date | undefined;
    time: string | undefined;
    image?: string;
    size: SizeCard;
    slideRef?: React.Ref<HTMLDivElement>;
    priority?: boolean;
}
