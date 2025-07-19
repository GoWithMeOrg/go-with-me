export interface IEvent {
    _id: string;
    name: string;
    description: string;
    startDate?: Date | string;
    time?: string;
    createdAt: Date | string;
    location: {
        type: "Point";
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    image?: string;
}
