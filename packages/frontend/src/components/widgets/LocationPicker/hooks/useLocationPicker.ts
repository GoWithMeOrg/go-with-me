import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePopup } from '@/components/shared/Popup/hooks';
import { APIProviderContext, useApiIsLoaded, useMapsLibrary } from '@vis.gl/react-google-maps';

export interface LocationData {
    type: 'Point';
    coordinates: [number, number];
    properties: {
        address: string;
    };
}

export interface UseLocationPickerProps {
    locationEvent?: LocationData;
    onPlaceChange?: (selectedPlace: google.maps.places.PlaceResult | null) => void;
    onChange?: (location: LocationData) => void;
}

export interface UseLocationPickerReturn {
    apiIsLoaded: boolean;
    mapAPI: any;
    geocoding: any;
    showPopup: boolean;
    container: any;
    popupCss: any;
    refPopup: any;
    markerPosition: google.maps.LatLngLiteral | null;
    selectedPlace: google.maps.places.PlaceResult | null;
    handleMapButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleMapClick: (e: { detail: { latLng: google.maps.LatLngLiteral | null } }) => void;
    handlePlaceSelect: (selectedPlace: google.maps.places.PlaceResult | null) => void;
    handleShowPopup: () => void;
    handleHidePopup: () => void;
    setShowPopup: (show: boolean) => void;
}

const popupMode: 'map' = 'map';

export const useLocationPicker = (
    props: UseLocationPickerProps
): UseLocationPickerReturn => {
    const apiIsLoaded = useApiIsLoaded();
    const geocoding = useMapsLibrary('geocoding');
    const mapAPI = useContext(APIProviderContext);

    const {
        showPopup,
        setShowPopup,
        handleShowPopup,
        handleHidePopup,
        container,
        popupCss,
        refPopup,
    } = usePopup({
        popupMode,
    });

    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
        props.locationEvent?.coordinates !== undefined
            ? {
                  lat: props.locationEvent.coordinates[1],
                  lng: props.locationEvent.coordinates[0],
              }
            : null
    );

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const prevSelectedPlaceRef = useRef<google.maps.places.PlaceResult | null>(selectedPlace);

    useEffect(() => {
        if (prevSelectedPlaceRef.current !== selectedPlace && props.onChange) {
            const newPlace: LocationData = {
                type: 'Point',
                coordinates: [
                    selectedPlace?.geometry?.location?.lng() ?? 0,
                    selectedPlace?.geometry?.location?.lat() ?? 0,
                ],
                properties: {
                    address: selectedPlace?.formatted_address ?? '',
                },
            };

            props.onChange(newPlace);
            prevSelectedPlaceRef.current = selectedPlace;
        }
    }, [selectedPlace, props]);

    const handleMapButtonClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleShowPopup();
        },
        [handleShowPopup]
    );

    const handleMapClick = useCallback(
        (e: { detail: { latLng: google.maps.LatLngLiteral | null } }) => {
            setMarkerPosition(e.detail.latLng);

            if (!geocoding) return;
            const geocoder = new geocoding.Geocoder();
            const pos = e.detail.latLng as google.maps.LatLngLiteral;
            geocoder.geocode({ location: pos }, (results, status) => {
                if (status === 'OK' && results !== null) {
                    const newPlace = results[0];
                    setSelectedPlace(newPlace);
                    if (newPlace.geometry?.location) {
                        setMarkerPosition({
                            lat: newPlace.geometry.location.lat(),
                            lng: newPlace.geometry.location.lng(),
                        });
                    }
                }
            });
        },
        [geocoding]
    );

    const handlePlaceSelect = useCallback(
        (selectedPlace: google.maps.places.PlaceResult | null) => {
            setSelectedPlace(selectedPlace);
            if (selectedPlace?.geometry?.location) {
                setMarkerPosition({
                    lat: selectedPlace.geometry.location.lat(),
                    lng: selectedPlace.geometry.location.lng(),
                });
            }
        },
        []
    );

    return {
        apiIsLoaded,
        mapAPI,
        geocoding,
        showPopup,
        container,
        popupCss,
        refPopup,
        markerPosition,
        selectedPlace,
        handleMapButtonClick,
        handleMapClick,
        handlePlaceSelect,
        handleShowPopup,
        handleHidePopup,
        setShowPopup,
    };
};
