import { useApiIsLoaded, useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

interface Props {
    coordinates: [number, number];
}

export const Geocoding = ({ coordinates }: Props) => {
    const apiIsLoaded = useApiIsLoaded();
    const lng = coordinates[0];
    const lat = coordinates[1];
    const [city, setCity] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [houseNumber, setHouseNumber] = useState<string>("");
    const geocodind = useMapsLibrary("geocoding");

    useEffect(() => {
        if (!apiIsLoaded || !geocodind) return;
        const geocoder = new geocodind.Geocoder();
        geocoder.geocode({ location: { lng, lat } }, (results, status) => {
            if (status === "OK" && results !== null) {
                setCity(results[0].address_components[2].long_name);
                setStreet(results[0].address_components[1].long_name);
                setHouseNumber(results[0].address_components[0].long_name);
            }
        });
    }, [apiIsLoaded, geocodind, lat, lng]);

    return (
        <div>
            {city}, {street}, {houseNumber}
        </div>
    );
};

export default Geocoding;
