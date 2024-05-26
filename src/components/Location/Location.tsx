import { SetStateAction, useContext, useRef, useState } from "react";
import classes from "./Location.module.css";
import Marker from "@/assets/icons/marker.svg";
import Autocomplete from "@/components/GoogleMap/Autocomplete";
import { Button } from "@/components/Button";
import { CustomMapControl, Geolocation, MapHandler } from "@/components/GoogleMap";
import {
    Map,
    AdvancedMarker,
    Pin,
    useApiIsLoaded,
    APIProviderContext,
    ControlPosition,
} from "@vis.gl/react-google-maps";
import Popup from "../Popup/Popup";

interface ILocation {
    address?: string;
    coord?: { lat: number; lng: number } | null;
    onPlaceChange?: (selectedPlace: google.maps.places.PlaceResult | null) => void;
}

export const Location = ({ address, onPlaceChange, coord }: ILocation) => {
    const apiIsLoaded = useApiIsLoaded();
    const mapAPI = useContext(APIProviderContext);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    if (!apiIsLoaded || !mapAPI) {
        return;
    }

    const handlePlaceSelect = (selectedPlace: google.maps.places.PlaceResult | null) => {
        if (onPlaceChange) {
            onPlaceChange(selectedPlace);
        }
    };

    handlePlaceSelect(selectedPlace);
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
            <Autocomplete className={classes.fieldInput} onPlaceSelect={setSelectedPlace} address={address} />
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
                    //defaultCenter={coord ? { lat: coord.lat ?? 22.54992, lng: coord.lng ?? 0 } : { lat: 22.54992, lng: 0 }}
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
                            address={address}
                        />
                    </CustomMapControl>
                    <MapHandler place={selectedPlace} />
                </Map>
                <div className={classes.buttonBlockMap}>
                    <Geolocation />
                    <Button className={classes.buttonMap} onClick={() => setShowPopup(false)} text={"Закрыть карту"} />
                </div>
            </Popup>
        </label>
    );
};

export default Location;
