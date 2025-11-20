import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MAP_CONSTANTS } from '@/constants/map';
import {
  APIProviderContext,
  ControlPosition,
  Map,
  useApiIsLoaded,
  useMap,
} from '@vis.gl/react-google-maps';

import { CardEventMap } from '../CardEventMap/CardEventMap';
import { Autocomplete } from './Autocomplete';
import { CustomMapControl } from './CustomMapControl';
import { MapController } from './MapController';
import { MapHandlerBounds } from './MapHandlerBounds';
import { optionsFullAdress } from './OptionsAutocomplete';
import { IEvent } from './types/Type';

interface Props {
  events?: IEvent[];
  selectedLocation?: google.maps.places.PlaceResult | null;
}

export const GoogleMap: React.FC<Props> = ({ events = [], selectedLocation }) => {
  const apiIsLoaded = useApiIsLoaded();
  const ctx = useContext(APIProviderContext);
  const map = useMap();
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleMarkerClick = useCallback((event: IEvent, offsetLat: number, offsetLng: number) => {
    setSelectedEventId(event._id);
  }, []);

  useEffect(() => {
    if (map && selectedLocation?.geometry?.viewport) {
      const bounds = selectedLocation.geometry.viewport;
      map.fitBounds(bounds);
    }
  }, [map, selectedLocation]);

  if (!apiIsLoaded || !ctx) return null;

  const selectedEvent = events.find((e) => e._id === selectedEventId);

  return (
    <div style={{ display: 'flex', height: '600px' }}>
      {/* Sidebar карточка */}
      {selectedEvent && <CardEventMap selectedEvent={selectedEvent} />}

      {/* Карта */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Map
          defaultZoom={3}
          defaultCenter={MAP_CONSTANTS.DEFAULT_CENTER}
          gestureHandling="greedy"
          disableDefaultUI={false}
          mapId={'<Your custom MapId here>'}
          onClick={() => setSelectedEventId(null)}
        >
          <MapController
            onMarkerClick={handleMarkerClick}
            selectedEventId={selectedEventId}
            events={events}
          />
        </Map>

        <CustomMapControl controlPosition={ControlPosition.TOP}>
          <Autocomplete onPlaceSelect={setSelectedPlace} options={optionsFullAdress} />
        </CustomMapControl>
        <MapHandlerBounds place={selectedPlace} />
      </div>
    </div>
  );
};
