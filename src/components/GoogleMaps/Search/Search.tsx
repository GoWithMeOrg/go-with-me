// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

import { Loader } from "@googlemaps/js-api-loader";
import { useRef, useState } from "react";
import classes from "./Search.module.css";

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

export const Search = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const initAutocomplete = async () => {
        //грузим карту
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
            version: "weekly",
            libraries: ["places", "marker", "core"],
        });

        const { Map } = (await loader.importLibrary("maps")) as google.maps.MapsLibrary;
        const map = new Map(mapRef.current as HTMLDivElement, {
            center: { lat: 60.01, lng: 30.35 },
            zoom: 15,
            mapId: "MY_MAP_ID",
        });

        const { Autocomplete, SearchBox } = (await loader.importLibrary("places")) as google.maps.PlacesLibrary;
        const autocomplete = new Autocomplete(inputRef.current as HTMLInputElement, {
            fields: ["address_components", "geometry", "icon", "name"],
            types: ["establishment"],
        });

        const searchBox = new SearchBox(inputRef.current as HTMLInputElement);

        const { AdvancedMarkerElement } = (await loader.importLibrary("marker")) as google.maps.MarkerLibrary;
        // Create the search box and link it to the UI element.
        //const input = document.getElementById("pac-input") as HTMLInputElement;
        //const searchBox = new google.maps.places.SearchBox(input);

        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
        });

        let markers: google.maps.MarkerLibrary[] = [];

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            //@ts-ignore
            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            // markers.forEach((marker) => {
            //     marker.setMap(null);
            // });
            // markers = [];

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();
            //@ts-ignore
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

                // Create a marker for each place.
                // markers.push(
                //     new google.maps.Marker({
                //         map,
                //         icon,
                //         title: place.name,
                //         position: place.geometry.location,
                //     }),
                // );

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    };

    initAutocomplete();

    return (
        <div className={classes.map}>
            <input id="pac-input" className={classes.searchInput} type="text" placeholder="Search Box" ref={inputRef} />
            <div style={{ height: "600px" }} ref={mapRef}></div>
        </div>
    );
};
