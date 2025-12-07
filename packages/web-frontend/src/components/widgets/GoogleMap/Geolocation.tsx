import { Button } from '@/components/shared/Button';
import { useMap } from '@vis.gl/react-google-maps';

import classes from './Autocomlete.module.css';

export const Geolocation = () => {
  const map = useMap();
  const toLocate = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Вы находитесь здесь.');
          infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(16);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      if (!map) return;
      handleLocationError(false, infoWindow, map.getCenter()!);
    }
  };

  function handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  const infoWindow = new google.maps.InfoWindow();
  return (
    <Button className={classes.buttonMap} onClick={toLocate}>
      Найти меня
    </Button>
  );
};

export default Geolocation;
