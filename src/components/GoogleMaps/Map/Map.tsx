"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

export const Map = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
                version: "weekly",
                libraries: ["places", "marker", "core"],
            });

            const { Map } = (await loader.importLibrary("maps")) as google.maps.MapsLibrary;
            const { AdvancedMarkerElement } = (await loader.importLibrary("marker")) as google.maps.MarkerLibrary;

            // координаты центра
            const position = {
                lat: 60.01,
                lng: 30.35,
            };

            // опции карты
            const mapOptions: google.maps.MapOptions = {
                center: new google.maps.LatLng(position.lat, position.lng),
                zoom: 15,
                mapId: "MY_MAP_ID",
            };

            // создание карты
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            //устанавливаем маркер
            const marker = new AdvancedMarkerElement({
                map: map,
                position: position,
            });
        };

        initMap();
    }, []);

    return (
        <div>
            <div className="Maps">MAPS</div>
            <div style={{ height: "600px" }} ref={mapRef}></div>
        </div>
    );
};

export default Map;
