import { Loader } from "@googlemaps/js-api-loader";
import { useRef, useState } from "react";

import classes from "./TripRoute.module.css";

export const TripRoute = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const originRef = useRef<HTMLInputElement>(null);
    const destinationRef = useRef<HTMLInputElement>(null);

    const initMap = async () => {
        //инициализируем карту
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
            version: "weekly", // версия карты с еженедельными обновлениями
            libraries: ["places", "marker", "core"], // библиотеки, которые необходимо подключить
        });

        // загружаем библиотеку карт
        const { Map } = (await loader.importLibrary("maps")) as google.maps.MapsLibrary;

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

        // создаем карту и передаем опции
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        const { DirectionsService, DirectionsRenderer } = (await google.maps.importLibrary(
            "routes",
        )) as google.maps.RoutesLibrary;
        const directionsService = new DirectionsService();
        const directionsRenderer = new DirectionsRenderer();
        directionsRenderer.setMap(map);

        const { Autocomplete, SearchBox } = (await loader.importLibrary("places")) as google.maps.PlacesLibrary;
        const originSearch = new Autocomplete(originRef.current as HTMLInputElement, {
            fields: ["address_components", "geometry", "icon", "name"],
            types: ["establishment"],
        });

        const destinationSearch = new Autocomplete(originRef.current as HTMLInputElement, {
            fields: ["address_components", "geometry", "icon", "name"],
            types: ["establishment"],
        });
        // Поле для поиска
        const originBox = new SearchBox(destinationRef.current as HTMLInputElement);
        const destinationBox = new SearchBox(destinationRef.current as HTMLInputElement);

        const onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        };

        let originValue = originRef.current;
        let destinationValue = destinationRef.current;
        //console.log(originValue, destinationValue);

        if (originValue && destinationValue) {
            /* originValue.addEventListener("change", onChangeHandler); */
            destinationValue.addEventListener("change", onChangeHandler);
        }

        function calculateAndDisplayRoute(
            directionsService: google.maps.DirectionsService,
            directionsRenderer: google.maps.DirectionsRenderer,
        ) {
            directionsService
                .route({
                    origin: {
                        query: originValue?.value,
                    },
                    destination: {
                        query: destinationValue?.value,
                    },
                    travelMode: google.maps.TravelMode.DRIVING,
                })
                .then((response) => {
                    directionsRenderer.setDirections(response);
                })
                .catch((e) => window.alert("Directions request failed due to " + status));
        }
    };

    initMap();

    return (
        <div className={classes.map}>
            <div id="floating-panel">
                <b>Start: </b>
                <input type="text" id="start" ref={originRef} />
                <b>End: </b>
                <input type="text" id="end" ref={destinationRef} />
            </div>
            <div style={{ height: "600px" }} ref={mapRef}></div>
        </div>
    );
};

export default TripRoute;
