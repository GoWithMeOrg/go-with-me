'use client';

import Marker from '@/assets/icons/marker.svg';
import { Button } from '@/components/shared/Button';
import { Popup } from '@/components/shared/Popup';
import { CustomMapControl, Geolocation, MapHandler } from '@/components/widgets/GoogleMap';
import Autocomplete from '@/components/widgets/GoogleMap/Autocomplete';
import { optionsFullAdress } from '@/components/widgets/GoogleMap/OptionsAutocomplete';
import { AdvancedMarker, ControlPosition, Map, Pin } from '@vis.gl/react-google-maps';

import { useLocationPicker } from './hooks/useLocationPicker';

import classes from './LocationPicker.module.css';

interface LocationPickerProps {
    locationEvent?: {
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };

    onPlaceChange?: (selectedPlace: google.maps.places.PlaceResult | null) => void;
    onChange?: (location: {
        coordinates: [number, number];
        properties: {
            address: string;
        };
    }) => void;
}

export const LocationPicker = (props: LocationPickerProps) => {
    const {
        apiIsLoaded,
        mapAPI,
        showPopup,
        container,
        popupCss,
        refPopup,
        markerPosition,
        selectedPlace,
        handleMapButtonClick,
        handleMapClick,
        handlePlaceSelect,
        handleHidePopup,
    } = useLocationPicker(props);

    return (
        <div className={classes.locationForm}>
            <div className={classes.labelFindMap}>
                <span className={classes.titleInput}>Место/Адрес</span>
                <Button
                    className={classes.btnFindMap}
                    onClick={handleMapButtonClick}
                    resetDefaultStyles={true}
                >
                    <Marker style={{ marginRight: '0.25rem' }} />
                    Найти на карте
                </Button>
            </div>

            <Autocomplete
                className={classes.fieldInput}
                onPlaceSelect={handlePlaceSelect}
                address={
                    selectedPlace !== null
                        ? selectedPlace.formatted_address
                        : props.locationEvent?.properties?.address
                }
                options={optionsFullAdress}
            />

            <Popup
                showPopup={showPopup}
                container={container}
                popupCss={popupCss}
                refPopup={refPopup}
            >
                <Map
                    style={{ height: '600px' }}
                    defaultZoom={markerPosition ? 15 : 3}
                    defaultCenter={markerPosition || { lat: 22.54992, lng: 0 }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                    mapId={'<Your custom MapId here>'}
                    onClick={handleMapClick}
                >
                    <AdvancedMarker
                        position={markerPosition}
                        title={'AdvancedMarker with customized pin.'}
                    >
                        <Pin
                            background={'#FBBC04'}
                            borderColor={'#1e89a1'}
                            glyphColor={'#0f677a'}
                        ></Pin>
                    </AdvancedMarker>
                    <CustomMapControl controlPosition={ControlPosition.TOP}>
                        <Autocomplete
                            onPlaceSelect={handlePlaceSelect}
                            className={classes.inputFindMap}
                            address={
                                selectedPlace !== null
                                    ? selectedPlace.formatted_address
                                    : props.locationEvent?.properties?.address
                            }
                            options={optionsFullAdress}
                        />
                    </CustomMapControl>
                    <MapHandler place={selectedPlace} />
                </Map>
                <div className={classes.buttonBlockMap}>
                    <Geolocation />
                    <Button className={classes.buttonMap} onClick={handleHidePopup}></Button>
                </div>
            </Popup>
        </div>
    );
};

export default LocationPicker;
