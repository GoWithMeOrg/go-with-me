export interface CardEventProps {
    id: string;
    name: string;
    description: string;
    coord?: number[];
    startDate: string | Date | undefined;
    time: string | undefined;
    image?: string;
    slideRef?: React.Ref<HTMLDivElement>;
    priority?: boolean;
}
