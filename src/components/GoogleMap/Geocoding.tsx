import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

interface Props {
    lng: number;
    lat: number;
}

export const Geocoding = ({ lng, lat }: Props) => {
    const [city, setCity] = useState<string>("");
    const geocodind = useMapsLibrary("geocoding");

    if (!geocodind) return;
    const geocoder = new geocodind.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results !== null) {
            setCity(results[0]?.address_components[1]?.long_name);
            // console.log(results[0].address_components[2].long_name); // город
            // console.log(results[0].address_components[1].long_name); // улица
            // console.log(results[0].address_components[0].long_name); // № дома
        }
    });

    // useEffect(() => {
    //     if (!geocodind) return;
    //     const geocoder = new geocodind.Geocoder();
    //     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    //         console.log(results, status);
    //     });
    // }, [geocodind, lat, lng]);

    return <div>Geocoding</div>;
};

export default Geocoding;
