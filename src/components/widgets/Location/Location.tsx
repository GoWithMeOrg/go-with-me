import { SetStateAction, forwardRef, useContext, useEffect, useRef, useState } from "react";

import { Button } from "@/components/shared/Button";
import { CustomMapControl, Geolocation, MapHandler } from "@/components/widgets/GoogleMap";
import {
    Map,
    AdvancedMarker,
    Pin,
    useApiIsLoaded,
    APIProviderContext,
    ControlPosition,
} from "@vis.gl/react-google-maps";
import { Popup } from "@/components/shared/Popup";
import Marker from "@/assets/icons/marker.svg";
import Autocomplete from "@/components/widgets/GoogleMap/Autocomplete";

import classes from "./Location.module.css";

interface ILocation {
    locationEvent: {
        type: "Point";
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    onPlaceChange?: (selectedPlace: google.maps.places.PlaceResult | null) => void;
    onChange?: (...event: any[]) => void;
}

export const Location = forwardRef(function Location(props: ILocation, ref) {
    const apiIsLoaded = useApiIsLoaded();
    const mapAPI = useContext(APIProviderContext);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
        props.locationEvent !== undefined
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
    };

    const handleMarkerPosition = (e: { detail: { latLng: SetStateAction<google.maps.LatLngLiteral | null> } }) => {
        setMarkerPosition(e.detail.latLng);
    };

    return (
        <label className={classes.locationForm}>
            <div className={classes.labelFindMap}>
                <span className={classes.titleInput}>Location/Address</span>
                <Button className={classes.btnFindMap} onClick={handleShowMap}>
                    <Marker style={{ marginRight: "0.25rem" }} />
                    {"Find on Map"}
                </Button>
            </div>
            <Autocomplete
                className={classes.fieldInput}
                onPlaceSelect={setSelectedPlace}
                address={props.locationEvent?.properties?.address || ""}
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
                    defaultZoom={3}
                    defaultCenter={{ lat: 22.54992, lng: 0 }}
                    gestureHandling={"greedy"}
                    disableDefaultUI={false}
                    mapId={"<Your custom MapId here>"}
                    onClick={handleMarkerPosition}
                >
                    <AdvancedMarker
                        position={markerPosition}
                        // draggable={true}
                        title={"AdvancedMarker with customized pin."}
                    >
                        <Pin background={"#FBBC04"} borderColor={"#1e89a1"} glyphColor={"#0f677a"}></Pin>
                    </AdvancedMarker>
                    <CustomMapControl controlPosition={ControlPosition.TOP}>
                        <Autocomplete
                            onPlaceSelect={setSelectedPlace}
                            className={classes.inputFindMap}
                            address={props.locationEvent?.properties?.address || ""}
                        />
                    </CustomMapControl>
                    <MapHandler place={selectedPlace} />
                </Map>
                <div className={classes.buttonBlockMap}>
                    <Geolocation />
                    <Button className={classes.buttonMap} onClick={() => setShowPopup(false)}>
                        Закрыть карту
                    </Button>
                </div>
            </Popup>
        </label>
    );
});

export default Location;
