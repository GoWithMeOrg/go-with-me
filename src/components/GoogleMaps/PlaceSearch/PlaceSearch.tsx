import { Loader } from "@googlemaps/js-api-loader";
import { useRef } from "react";
import classes from "./PlaceSearch.module.css";

export const PlaceSearch = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
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

        // создаем поиск
        const { Autocomplete, SearchBox } = (await loader.importLibrary("places")) as google.maps.PlacesLibrary;
        const autocomplete = new Autocomplete(inputRef.current as HTMLInputElement, {
            fields: ["address_components", "geometry", "icon", "name"],
            types: ["establishment"],
        });
        // Поле для поиска
        const searchBox = new SearchBox(inputRef.current as HTMLInputElement);
        // размещаем поиск в блоке с картой
        map.controls[google.maps.ControlPosition.BLOCK_START_INLINE_CENTER].push(inputRef.current as HTMLInputElement);
        // границы карты, которые изменяются при поиске если поиск выходит за текущие размеры карты
        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
        });

        //загружаем библиотеку маркер
        const { AdvancedMarkerElement } = (await loader.importLibrary("marker")) as google.maps.MarkerLibrary;
        const marker = new AdvancedMarkerElement({
            map: map,
        });

        searchBox.addListener("places_changed", () => {
            const places: google.maps.places.PlaceResult[] | undefined = searchBox.getPlaces();

            if (places === undefined || places.length == 0) {
                return;
            } else {
                //получаем координаты искомого места
                places.forEach((place) => {
                    if (place.geometry && place.geometry.location) {
                        // Получаем координаты.
                        const position = new google.maps.LatLng(
                            place.geometry.location.lat(),
                            place.geometry.location.lng(),
                        );
                        //меняем координаты маркера
                        marker.position = position;
                    }
                });
            }

            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                const icon = {
                    url: place.icon as string,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                };

                if (place.geometry.viewport) {
                    // Задаем признак, что ближайшая точка находится в пределах видимого прямоугольника
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    };

    initMap();

    return (
        <div className={classes.map}>
            <input id="pac-input" className={classes.searchInput} type="text" placeholder="Найти ..." ref={inputRef} />
            <div style={{ height: "600px" }} ref={mapRef}></div>
        </div>
    );
};

export default PlaceSearch;
