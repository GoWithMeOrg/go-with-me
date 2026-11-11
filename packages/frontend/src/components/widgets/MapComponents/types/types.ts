import { LocationGeometryInput, LocationPropertiesInput } from '@go-with-me/shared/graphql';

export type LocationType = {
    geometry: LocationGeometryInput;
    properties: LocationPropertiesInput;
};

export type PlaceType = google.maps.places.Place | null;
