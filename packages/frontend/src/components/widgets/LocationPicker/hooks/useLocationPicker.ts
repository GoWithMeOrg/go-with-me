import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePopup } from '@/components/shared/Popup/hooks';
import { APIProviderContext, useApiIsLoaded, useMapsLibrary } from '@vis.gl/react-google-maps';

export interface LocationData {
    coordinates: [number, number];
    properties: {
        address: string;
    };
}

export interface UseLocationPickerProps {
    locationEvent?: LocationData;
    onPlaceChange?: (selectedPlace: google.maps.places.Place | null) => void;
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
    selectedPlace: google.maps.places.Place | null;
    setSelectedPlace: (place: google.maps.places.Place | null) => void;
    handleMapButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleMapClick: (e: { detail: { latLng: google.maps.LatLngLiteral | null } }) => void;
    handlePlaceSelect: (selectedPlace: google.maps.places.Place | null) => void;
    handleShowPopup: () => void;
    handleHidePopup: () => void;
    setShowPopup: (show: boolean) => void;
}

const popupMode: 'map' = 'map';

export const useLocationPicker = (props: UseLocationPickerProps) => {
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
                  lng: props.locationEvent.coordinates[0],
                  lat: props.locationEvent.coordinates[1],
              }
            : null
    );

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.Place | null>(null);
    const prevSelectedPlaceRef = useRef<google.maps.places.Place | null>(selectedPlace);

    useEffect(() => {
        if (prevSelectedPlaceRef.current !== selectedPlace && props.onChange) {
            const newPlace = {
                coordinates: [
                    selectedPlace?.location?.lng() ?? 0,
                    selectedPlace?.location?.lat() ?? 0,
                ] as [number, number],
                properties: {
                    address: selectedPlace?.formattedAddress ?? '',
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
                    const geocoderResult = results[0];
                    const newPlace = {
                        geometry: {
                            location: geocoderResult.geometry?.location,
                        },
                        formattedAddress: geocoderResult.formatted_address,
                        addressComponents: geocoderResult.address_components,
                    } as unknown as google.maps.places.Place;
                    setSelectedPlace(newPlace);
                    if (geocoderResult.geometry?.location) {
                        setMarkerPosition({
                            lat: geocoderResult.geometry.location.lat(),
                            lng: geocoderResult.geometry.location.lng(),
                        });
                    }
                }
            });
        },
        [geocoding]
    );

    const handlePlaceSelect = useCallback((selectedPlace: google.maps.places.Place | null) => {
        setSelectedPlace(selectedPlace);
        if (selectedPlace?.location) {
            setMarkerPosition({
                lat: selectedPlace.location.lat(),
                lng: selectedPlace.location.lng(),
            });
        }
    }, []);

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
        setSelectedPlace,
        handleMapButtonClick,
        handleMapClick,
        handlePlaceSelect,
        handleShowPopup,
        handleHidePopup,
        setShowPopup,
    };
};
