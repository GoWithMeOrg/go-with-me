import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePopup } from '@/components/shared/Popup/hooks';
import { UseLocationPickerProps } from '@/components/widgets/LocationPicker/interfaces/UseLocationPickerProps';
import { APIProviderContext, useApiIsLoaded, useMapsLibrary } from '@vis.gl/react-google-maps';

const PLACE_FIELDS: string[] = ['location', 'formattedAddress', 'addressComponents', 'displayName'];

const popupMode: 'map' = 'map';

export const useLocationPicker = ({ locationData, onChange }: UseLocationPickerProps) => {
    const apiIsLoaded = useApiIsLoaded();
    const geocoding = useMapsLibrary('geocoding');
    const places = useMapsLibrary('places');
    const mapAPI = useContext(APIProviderContext);

    const [displayValue, setDisplayValue] = useState<string>(
        locationData?.properties.address ?? ''
    );

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.Place | null>(null);

    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
        locationData?.geometry !== undefined
            ? {
                  lng: locationData.geometry.coordinates[0],
                  lat: locationData.geometry.coordinates[1],
              }
            : null
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

    const autocompleteValue = selectedPlace?.formattedAddress;

    const prevSelectedPlaceRef = useRef<google.maps.places.Place | null>(null);

    const onPlaceChangeRef = useRef(onChange);
    useEffect(() => {
        onPlaceChangeRef.current = onChange;
    });

    useEffect(() => {
        if (prevSelectedPlaceRef.current === selectedPlace || !onPlaceChangeRef.current) return;

        const location = selectedPlace?.location;

        // Возвращаем данные в формате EventFormData.location
        onPlaceChangeRef.current({
            geometry: {
                coordinates: [location?.lng() ?? 0, location?.lat() ?? 0],
            },
            properties: {
                address: selectedPlace?.formattedAddress ?? '',
            },
        });

        prevSelectedPlaceRef.current = selectedPlace;
    }, [selectedPlace]);

    const handleMapButtonClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleShowPopup();
        },
        [handleShowPopup]
    );

    const handleMapClick = useCallback(
        async (e: { detail: { latLng: google.maps.LatLngLiteral | null } }) => {
            const latLng = e.detail.latLng;
            if (!latLng || !geocoding || !places) return;

            setMarkerPosition(latLng);

            const geocoder = new geocoding.Geocoder();
            const { results } = await geocoder.geocode({ location: latLng });
            const topResult = results?.[0];

            if (!topResult?.place_id) return;

            setDisplayValue(topResult.formatted_address);

            const place = new places.Place({ id: topResult.place_id });
            await place.fetchFields({ fields: PLACE_FIELDS });
            setSelectedPlace(place);
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
