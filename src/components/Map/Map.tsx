import React, { FC, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type MapProps = {
    location?: { lat: number; lng: number };
    onLocationChanges?: (location: { lat: number; lng: number }) => void;
};

const Map: FC<MapProps> = ({ location, onLocationChanges }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
            version: "weekly",
        });

        if (ref.current) {
            loader.load().then(() => {
                const map = new google.maps.Map(ref.current as HTMLDivElement, {
                    center: { lat: -34.397, lng: 150.644 },
                    zoom: 8,
                });
            });
        }
    }, []);

    return <div ref={ref}>Map</div>;
};

export { Map };
