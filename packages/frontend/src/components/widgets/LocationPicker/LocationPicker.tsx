'use client';

import Marker from '@/assets/icons/marker.svg';
import { Button } from '@/components/shared/Button';
import { Popup } from '@/components/shared/Popup';
import { CustomMapControl, MapHandler } from '@/components/widgets/GoogleMap';
import { AdvancedMarker, ControlPosition, Map, Pin } from '@vis.gl/react-google-maps';

import { Autocomplete } from '../Autocomlete/Autocomplete';
import AutocompleteResult from './AutocompleteResult';
import { useLocationPicker } from './hooks/useLocationPicker';

import classes from './LocationPicker.module.css';

interface LocationPickerProps {
    locationEvent?: {
        coordinates: [number, number];
        properties: { address: string };
    };
    onPlaceChange?: (selectedPlace: google.maps.places.Place | null) => void;
    onChange?: (location: {
        coordinates: [number, number];
        properties: { address: string };
    }) => void;
}

export const LocationPicker = (props: LocationPickerProps) => {
    const {
        showPopup,
        container,
        popupCss,
        refPopup,
        markerPosition,
        selectedPlace,
        setSelectedPlace,
        handleMapButtonClick,
        handleMapClick,
        handlePlaceSelect, // ← теперь async, обёртка в Autocomplete не нужна
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

            <Autocomplete onPlaceSelect={handlePlaceSelect} />

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
                    <AdvancedMarker position={markerPosition} title={'Выбранное место'}>
                        <Pin
                            background={'#FBBC04'}
                            borderColor={'#1e89a1'}
                            glyphColor={'#0f677a'}
                        />
                    </AdvancedMarker>

                    <CustomMapControl controlPosition={ControlPosition.TOP}>
                        <Autocomplete onPlaceSelect={handlePlaceSelect} />
                    </CustomMapControl>

                    <MapHandler place={selectedPlace} />
                    <AutocompleteResult place={selectedPlace} />
                </Map>

                <div className={classes.buttonBlockMap}>
                    <Button className={classes.buttonMap} onClick={handleHidePopup} />
                </div>
            </Popup>
        </div>
    );
};

export default LocationPicker;
