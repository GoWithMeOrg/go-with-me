'use client';

import { FC } from 'react';
import Marker from '@/assets/icons/marker.svg';
import { Button } from '@/components/shared/Button';
import { Popup } from '@/components/shared/Popup';
import { AdvancedMarker, ControlPosition, Map } from '@vis.gl/react-google-maps';

import { Autocomplete } from '../Autocomlete/Autocomplete';
import AutocompleteControl from './AutocompleteControl';
import AutocompleteResult from './AutocompleteResult';
import { LocationData, useLocationPicker } from './hooks/useLocationPicker';

import classes from './LocationPicker.module.css';

interface LocationPickerProps {
    locationEvent?: LocationData;
    onChange?: (location: LocationData) => void;
}

export const LocationPicker: FC<LocationPickerProps> = (props: LocationPickerProps) => {
    const {
        showPopup,
        container,
        popupCss,
        refPopup,
        selectedPlace,
        handleMapButtonClick,
        handleMapClick,
        handlePlaceSelect,
        handleHidePopup,
        autocompleteValue,
        markerPosition,
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

            <Autocomplete value={autocompleteValue as string} onPlaceSelect={handlePlaceSelect} />

            <Popup
                showPopup={showPopup}
                container={container}
                popupCss={popupCss}
                refPopup={refPopup}
            >
                <Map
                    style={{ height: '600px' }}
                    defaultZoom={3}
                    defaultCenter={{ lat: 22.54992, lng: 0 }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                    mapId={'<Your custom MapId here>'}
                    onClick={handleMapClick}
                >
                    <AutocompleteControl controlPosition={ControlPosition.TOP_CENTER}>
                        <Autocomplete
                            value={autocompleteValue as string}
                            onPlaceSelect={handlePlaceSelect}
                        />
                    </AutocompleteControl>

                    {markerPosition && (
                        <AdvancedMarker position={markerPosition}>
                            <gmp-pin
                                background={'#FBBC04'}
                                borderColor={'#1e89a1'}
                                glyphColor={'#0f677a'}
                            />
                        </AdvancedMarker>
                    )}

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
