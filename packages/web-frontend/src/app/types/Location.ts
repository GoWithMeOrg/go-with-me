export interface Location {
    _id: string;
    coordinates: [number, number];
    createdAt: Date;
    ownerId: string;
    ownerType: string;
    properties: LocationProperties;
    type: string;
    updatedAt: Date;
}

type LocationProperties = {
    address: string;
};
