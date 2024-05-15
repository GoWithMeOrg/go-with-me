import { useContext, useRef, useState } from "react";
import classes from "./LocationField.module.css";
import Marker from "@/assets/icons/marker.svg";
import Autocomplete from "@/components/GoogleMap/Autocomplete";
import { Input } from "@/components/Input";
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
import { APIProviderGoogleMaps } from "@/app/providers";

interface ILocationField {
    address?: string;
}

export const LocationField = ({ address }: ILocationField) => {
    const apiIsLoaded = useApiIsLoaded();
    const mapAPI = useContext(APIProviderContext);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const originRef = useRef<HTMLInputElement>(null);
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    if (!apiIsLoaded || !mapAPI) {
        return;
    }

    const handleShowMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return (
        <label className={classes.locationForm}>
            <div className={classes.labelFindMap}>
                <span className={classes.titleInput}>Location/Address</span>
                <Button className={classes.btnFindMap} onClick={handleShowMap} text={"Find on Map"}>
                    <Marker style={{ marginRight: "0.25rem" }} />
                </Button>
            </div>
            <Autocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                <Input
                    id="location"
                    type={"text"}
                    placeholder={""}
                    defaultValue={address}
                    className={classes.fieldInput}
                />
            </Autocomplete>
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
                    onClick={(e) => {
                        setMarkerPosition(e.detail.latLng);
                    }}
                >
                    <AdvancedMarker
                        position={markerPosition}
                        // draggable={true}
                        title={"AdvancedMarker with customized pin."}
                    >
                        <Pin background={"#FBBC04"} borderColor={"#1e89a1"} glyphColor={"#0f677a"}></Pin>
                    </AdvancedMarker>
                    <CustomMapControl controlPosition={ControlPosition.TOP}>
                        <Autocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                            <Input type={"text"} placeholder={"Найти ..."} defaultValue={address} />
                        </Autocomplete>
                    </CustomMapControl>
                    <MapHandler place={selectedPlace} />
                </Map>
                <div className={classes.buttonBlockMap}>
                    <Geolocation />
                    <Button onClick={() => setShowPopup(false)} text={"Закрыть карту"} />
                </div>
            </Popup>
        </label>
    );
};

export default LocationField;
