import { FC, useEffect } from 'react';
import { ITrip } from '@/database/models/Trip';
import { formatDate } from '@/utils/formatDate';
import { AdvancedMarker, Map, Pin, useMap } from '@vis.gl/react-google-maps';

import classes from './Trip.module.css';

export interface TripProps {
  tripData: ITrip;
}

export const Trip: FC<TripProps> = ({ tripData }) => {
  const map = useMap();

  const eventCoord: google.maps.LatLngLiteral[] = tripData.events?.map((event) => ({
    lat: event.location.coordinates[1],
    lng: event.location.coordinates[0],
  }));

  useEffect(() => {
    const focusMarker = (coordinates: google.maps.LatLngLiteral) => {
      if (map) {
        map.panTo(coordinates);
        map.setZoom(6);
      }
    };

    if (eventCoord.length > 0) {
      focusMarker(eventCoord[0]);
    }
  }, [eventCoord, map]);

  return (
    <div className={classes.container}>
      <div className={classes.descr}>
        <h3 className={classes.header}>{tripData.name}</h3>
        <div>Организатор: {tripData.organizer.name}</div>
        <div>{tripData.description}</div>
        <div>{formatDate(tripData.startDate, 'dd LLLL yyyy')}</div>
        <div>{formatDate(tripData.endDate, 'dd LLLL yyyy')}</div>

        <div className={classes.eventsList}>
          <h6>Events:</h6>
          {tripData.events?.map((eventData) => (
            <li key={eventData._id}>{eventData.name}</li>
          ))}
        </div>
      </div>

      <div className={classes.map}>
        <Map
          style={{ height: '600px' }}
          defaultZoom={3}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          mapId={'<Your custom MapId here>'}
        >
          {eventCoord?.map((eventCoord) => {
            if (eventCoord.lat !== undefined && eventCoord.lng !== undefined) {
              return (
                <AdvancedMarker key={eventCoord.lat} position={eventCoord}>
                  <Pin background={'#FBBC04'} borderColor={'#1e89a1'} glyphColor={'#0f677a'}></Pin>
                </AdvancedMarker>
              );
            } else {
              return null;
            }
          })}
        </Map>
      </div>
    </div>
  );
};

export default Trip;
