import React, { useEffect, useState } from 'react';
import { useApiIsLoaded, useMapsLibrary } from '@vis.gl/react-google-maps';

interface Props {
  coordinates: [number, number];
}

//определиться, что будет являть местом и что изходя из этого будем выводить.
export const Geocoding = ({ coordinates }: Props) => {
  const apiIsLoaded = useApiIsLoaded();
  const [lng, lat] = coordinates;
  const [addressComponents, setAddressComponents] = useState<any[]>([]);
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [houseNumber, setHouseNumber] = useState<string>('');
  const geocoding = useMapsLibrary('geocoding');

  useEffect(() => {
    if (!apiIsLoaded || !geocoding || !Array.isArray(coordinates) || coordinates.length !== 2)
      return;
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) return;

    const geocoder = new google.maps.Geocoder();

    const location: google.maps.LatLngLiteral = { lat, lng };

    geocoder.geocode(
      { location: { lng: coordinates[0], lat: coordinates[1] } },
      (results, status) => {
        if (status === 'OK' && results !== null) {
          setCity(results[0].address_components[3]?.short_name);
          //setStreet(results[0].address_components[1].long_name);
          // setHouseNumber(results[0].address_components[0].long_name);
          // console.log(results[1]);
        }
      }
    );
  }, [apiIsLoaded, coordinates, geocoding, lat, lng]);

  return (
    <span>
      {city}
      {/* , {street}, {houseNumber} */}
    </span>
  );
};

export default Geocoding;
