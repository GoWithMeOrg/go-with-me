import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { useMap } from '@vis.gl/react-google-maps';
import gql from 'graphql-tag';

interface Props {
  place: google.maps.places.PlaceResult | null;
}

type Bounds = {
  south: number;
  west: number;
  north: number;
  east: number;
};

const GET_EVENTS_BY_LOCATION = gql`
  query GetEventsByLocation($bounds: Bounds!) {
    eventSearchByLocation(bounds: $bounds) {
      name
      location {
        properties {
          address
        }
        coordinates
      }
    }
  }
`;

export const MapHandlerBounds = ({ place }: Props) => {
  const map = useMap();
  const rectangleRef = useRef<google.maps.Rectangle | null>(null);
  const [bounds, setBounds] = useState<Bounds | null>(null);

  const { data: SearchEventByLocation } = useQuery(GET_EVENTS_BY_LOCATION, {
    variables: { bounds },
  });

  const normalizeViewport = (viewport: any) => {
    return {
      south: viewport.ei?.lo,
      west: viewport.Hh?.lo,
      north: viewport.ei?.hi,
      east: viewport.Hh?.hi,
    };
  };

  useEffect(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
      const viewport = normalizeViewport(place?.geometry?.viewport);
      setBounds(viewport);
      if (
        viewport.north !== undefined &&
        viewport.south !== undefined &&
        viewport.east !== undefined &&
        viewport.west !== undefined
      ) {
        const latLngBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(viewport.south, viewport.west),
          new google.maps.LatLng(viewport.north, viewport.east)
        );

        if (map && rectangleRef?.current) {
          map.fitBounds(latLngBounds);
          rectangleRef.current.setMap(null);
        }

        rectangleRef.current = new google.maps.Rectangle({
          bounds: latLngBounds,
          map: map,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.2,
        });
      } else {
        console.error('Viewport normalization failed.');
      }
    }
  }, [map, place]);

  return null;
};

export default React.memo(MapHandlerBounds);
