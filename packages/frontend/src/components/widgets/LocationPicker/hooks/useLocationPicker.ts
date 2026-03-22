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

const PLACE_FIELDS: string[] = ['location', 'formattedAddress', 'addressComponents', 'displayName'];

const popupMode: 'map' = 'map';

export const useLocationPicker = (props: UseLocationPickerProps) => {
    const apiIsLoaded = useApiIsLoaded();
    const geocoding = useMapsLibrary('geocoding');
    const places = useMapsLibrary('places');
    const mapAPI = useContext(APIProviderContext);

    const [displayValue, setDisplayValue] = useState<string>(
        props.locationEvent?.properties.address ?? ''
    );

    const {
        showPopup,
        setShowPopup,
        handleShowPopup,
        handleHidePopup,
        container,
        popupCss,
        refPopup,
    } = usePopup({ popupMode });

    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
        props.locationEvent?.coordinates !== undefined
            ? {
                  lng: props.locationEvent.coordinates[0],
                  lat: props.locationEvent.coordinates[1],
              }
            : null
    );

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.Place | null>(null);
    const autocompleteValue = selectedPlace?.formattedAddress;
    console.log(selectedPlace?.formattedAddress);
    const prevSelectedPlaceRef = useRef<google.maps.places.Place | null>(null);

    useEffect(() => {
        if (prevSelectedPlaceRef.current === selectedPlace || !props.onChange) return;

        const location = selectedPlace?.location;

        props.onChange({
            coordinates: [location?.lng() ?? 0, location?.lat() ?? 0],
            properties: {
                address: selectedPlace?.formattedAddress ?? '',
            },
        });

        prevSelectedPlaceRef.current = selectedPlace;
    }, [selectedPlace, props]);

    const handleMapButtonClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleShowPopup();
        },
        [handleShowPopup]
    );

    // const handleMapClick = useCallback(
    //     async (e: { detail: { latLng: google.maps.LatLngLiteral | null } }) => {
    //         const latLng = e.detail.latLng;
    //         if (!latLng || !geocoding || !places) return;

    //         setMarkerPosition(latLng);

    //         const geocoder = new geocoding.Geocoder();
    //         const { results } = await geocoder.geocode({ location: latLng });
    //         const topResult = results?.[0];

    //         if (!topResult?.place_id) return;

    //         const place = new places.Place({ id: topResult.place_id });
    //         await place.fetchFields({ fields: PLACE_FIELDS });

    //         setSelectedPlace(place);

    //         if (place.location) {
    //             setMarkerPosition({
    //                 lat: place.location.lat(),
    //                 lng: place.location.lng(),
    //             });
    //         }
    //     },
    //     [geocoding, places]
    // );

    // const handlePlaceSelect = useCallback(
    //     async (place: google.maps.places.Place | null) => {
    //         if (!place) {
    //             setSelectedPlace(null);
    //             return;
    //         }

    //         if (!place.formattedAddress && places) {
    //             await place.fetchFields({ fields: PLACE_FIELDS });
    //         }

    //         setSelectedPlace(place);

    //         if (place.location) {
    //             setMarkerPosition({
    //                 lat: place.location.lat(),
    //                 lng: place.location.lng(),
    //             });
    //         }
    //     },
    //     [places]
    // );

    const handleMapClick = useCallback(
        async (e: { detail: { latLng: google.maps.LatLngLiteral | null } }) => {
            const latLng = e.detail.latLng;
            if (!latLng || !geocoding || !places) return;

            setMarkerPosition(latLng);

            const geocoder = new geocoding.Geocoder();
            const { results } = await geocoder.geocode({ location: latLng });
            const topResult = results?.[0];

            if (!topResult?.place_id) return;

            // Мгновенно — геокодер уже вернул адрес
            setDisplayValue(topResult.formatted_address);

            // fetchFields в фоне — для полного объекта Place
            const place = new places.Place({ id: topResult.place_id });
            await place.fetchFields({ fields: PLACE_FIELDS });
            setSelectedPlace(place);

            if (place.location) {
                setMarkerPosition({
                    lat: place.location.lat(),
                    lng: place.location.lng(),
                });
            }
        },
        [geocoding, places]
    );

    const handlePlaceSelect = useCallback(
        async (place: google.maps.places.Place | null) => {
            if (!place) {
                setSelectedPlace(null);
                setDisplayValue('');
                return;
            }

            if (!place.formattedAddress && places) {
                await place.fetchFields({ fields: PLACE_FIELDS });
            }

            // Autocomplete сам уже показал адрес в инпуте при выборе,
            // displayValue синхронизируем для второго инпута
            setDisplayValue(place.formattedAddress ?? '');
            setSelectedPlace(place);

            if (place.location) {
                setMarkerPosition({
                    lat: place.location.lat(),
                    lng: place.location.lng(),
                });
            }
        },
        [places]
    );

    return {
        apiIsLoaded,
        mapAPI,
        geocoding,
        showPopup,
        setShowPopup,
        container,
        popupCss,
        refPopup,
        markerPosition,
        selectedPlace,
        autocompleteValue,
        setSelectedPlace,
        handleMapButtonClick,
        handleMapClick,
        handlePlaceSelect,
        handleShowPopup,
        handleHidePopup,

        displayValue,
    };
};
