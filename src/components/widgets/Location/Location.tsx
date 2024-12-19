import { forwardRef, SetStateAction, useContext, useEffect, useRef, useState } from "react";

import { Button } from "@/components/shared/Button";
import { CustomMapControl, Geolocation, MapHandler } from "@/components/widgets/GoogleMap";
import {
    Map,
    AdvancedMarker,
    Pin,
    useApiIsLoaded,
    APIProviderContext,
    ControlPosition,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Popup } from "@/components/shared/Popup";
import Marker from "@/assets/icons/marker.svg";
import Autocomplete from "@/components/widgets/GoogleMap/Autocomplete";
import { optionsFullAdress } from "@/components/widgets/GoogleMap/OptionsAutocomplete";

import classes from "./Location.module.css";

interface ILocation {
    locationEvent?: {
        type: "Point";
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    onPlaceChange?: (selectedPlace: google.maps.places.PlaceResult | null) => void;
    onChange?: (...event: any[]) => void;
    hideButtonMap?: boolean;
}

export const Location = forwardRef(function Location(props: ILocation, ref) {
    const apiIsLoaded = useApiIsLoaded();
    const geocoding = useMapsLibrary("geocoding");
    const mapAPI = useContext(APIProviderContext);
    const [hideButton, setHideButton] = useState<boolean>(props.hideButtonMap || false);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
        props.locationEvent?.coordinates !== undefined
            ? {
                  lat: props.locationEvent?.coordinates[0],
                  lng: props.locationEvent?.coordinates[1],
              }
            : null,
    );

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

    const prevSelectedPlaceRef = useRef<google.maps.places.PlaceResult | null>(selectedPlace);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        if (prevSelectedPlaceRef.current !== selectedPlace && props.onChange) {
            const newPlace = {
                coordinates: [selectedPlace?.geometry?.location?.lat(), selectedPlace?.geometry?.location?.lng()],
                properties: {
                    address: selectedPlace?.formatted_address,
                },
            };

            props.onChange(newPlace);
            prevSelectedPlaceRef.current = selectedPlace;
        }
    }, [selectedPlace, props]);

    if (!apiIsLoaded || !mapAPI) {
        return;
    }

    const handleShowMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
        setSelectedPlace(null);
    };
    const handleMapClose = () => {
        setShowPopup(false);
    };

    const handleMapClick = (e: { detail: { latLng: SetStateAction<google.maps.LatLngLiteral | null> } }) => {
        setSelectedPlace(null);
        setMarkerPosition(e.detail.latLng);
        if (!geocoding) return;
        const geocoder = new geocoding.Geocoder();
        const pos = e.detail.latLng as any;
        geocoder.geocode({ location: pos }, (results, status) => {
            if (status === "OK" && results !== null) {
                const place = results[0];
                setSelectedPlace(place);
            }
        });
    };

    return (
        <label className={classes.locationForm}>
            <div className={classes.labelFindMap}>
                <span className={classes.titleInput}>Location/Address</span>
                {!hideButton && (
                    <Button className={classes.btnFindMap} onClick={handleShowMap} resetDefaultStyles={true}>
                        <Marker style={{ marginRight: "0.25rem" }} />
                        Find on Map
                    </Button>
                )}
            </div>

            <Autocomplete
                className={classes.fieldInput}
                onPlaceSelect={setSelectedPlace}
                address={
                    selectedPlace !== null ? selectedPlace.formatted_address : props.locationEvent?.properties?.address
                }
                options={optionsFullAdress}
            />

            <Popup
                {...{
                    showPopup,
                    setShowPopup,
                }}
                style={{ backgroundColor: "none", padding: "1rem", borderRadius: "0.5rem", width: "60%" }}
            >
                <Map
                    style={{ height: "600px" }}
                    defaultZoom={markerPosition ? 15 : 3}
                    defaultCenter={markerPosition || { lat: 22.54992, lng: 0 }}
                    gestureHandling={"greedy"}
                    disableDefaultUI={false}
                    mapId={"<Your custom MapId here>"}
                    onClick={handleMapClick}
                >
                    <AdvancedMarker position={markerPosition} title={"AdvancedMarker with customized pin."}>
                        <Pin background={"#FBBC04"} borderColor={"#1e89a1"} glyphColor={"#0f677a"}></Pin>
                    </AdvancedMarker>
                    <CustomMapControl controlPosition={ControlPosition.TOP}>
                        <Autocomplete
                            onPlaceSelect={setSelectedPlace}
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
                    <Button className={classes.buttonMap} onClick={handleMapClose}>
                        Закрыть
                    </Button>
                </div>
            </Popup>
        </label>
    );
});

export default Location;
