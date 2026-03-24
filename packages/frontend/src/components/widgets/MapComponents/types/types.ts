import { LocationGeometryInput, LocationPropertiesInput } from '@/app/graphql/types';

export type LocationType = {
    geometry: LocationGeometryInput;
    properties: LocationPropertiesInput;
};

export type PlaceType = google.maps.places.Place | null;
