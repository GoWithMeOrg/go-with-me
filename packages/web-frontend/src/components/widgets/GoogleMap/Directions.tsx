import React, { useEffect, useRef, useState } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const Directions = ({ onPlaceSelect }: Props) => {
  const map = useMap();
  const places = useMapsLibrary('places');
  const routesLibrary = useMapsLibrary('routes');
  const [originPlace, setOriginPlace] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationPlace, setDestinationPlace] = useState<google.maps.places.Autocomplete | null>(
    null
  );
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);

  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!places || !originRef.current || !destinationRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    const originAutocomplete = new places.Autocomplete(originRef.current, options);
    const destinationAutocomplete = new places.Autocomplete(destinationRef.current, options);

    setOriginPlace(originAutocomplete);
    setDestinationPlace(destinationAutocomplete);

    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));

    return () => {
      google.maps.event.clearInstanceListeners(originAutocomplete);
      google.maps.event.clearInstanceListeners(destinationAutocomplete);
    };
  }, [map, places, routesLibrary]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !originPlace || !destinationPlace) return;

    const calculateAndDisplayRoute = () => {
      const originValue = originRef.current?.value;
      const destinationValue = destinationRef.current?.value;

      if (!originValue || !destinationValue) return;

      directionsService
        .route({
          origin: { query: originValue },
          destination: { query: destinationValue },
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
        })
        .catch((e) => console.log('Ошибка запроса маршрута:', e));
    };

    const originListener = originPlace.addListener('place_changed', () => {
      onPlaceSelect(originPlace.getPlace());
      calculateAndDisplayRoute();
    });

    const destinationListener = destinationPlace.addListener('place_changed', () => {
      calculateAndDisplayRoute();
    });

    return () => {
      if (originListener) originListener.remove();
      if (destinationListener) destinationListener.remove();
      if (directionsRenderer) directionsRenderer.setMap(null);
    };
  }, [onPlaceSelect, originPlace, destinationPlace, directionsService, directionsRenderer]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  return (
    <>
      <div>
        <input ref={originRef} placeholder="Откуда" />
        <input ref={destinationRef} placeholder="Куда" />
      </div>

      {selected && (
        <div className="directions">
          <h2>{selected?.summary}</h2>
          <p>
            {leg?.start_address.split(',')[0]} до {leg?.end_address.split(',')[0]}
          </p>
          <div>
            <p>Расстояние: {leg?.distance?.text}</p>
            <p>Время: {leg?.duration?.text}</p>
          </div>

          <h3>Другие маршруты</h3>
          <ul>
            {routes.map((route, index) => (
              <li key={route.summary}>
                <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
