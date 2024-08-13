import React, { useEffect, useRef, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

interface Props {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}
export const Directions = ({ onPlaceSelect }: Props) => {
    const map = useMap();
    const places = useMapsLibrary("places");
    const routesLibrary = useMapsLibrary("routes");
    const [originPlace, setOriginPlace] = useState<google.maps.places.Autocomplete | null>(null);
    const [destinationPlace, setDestinationPlace] = useState<google.maps.places.Autocomplete | null>(null);
    const originRef = useRef<HTMLInputElement>(null);
    const destinationRef = useRef<HTMLInputElement>(null);

    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);

    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
        if (!places || !originRef.current || !destinationRef.current) return;
        const options = {
            fields: ["geometry", "name", "formatted_address"],
        };
        setOriginPlace(new places.Autocomplete(originRef.current, options));
        setDestinationPlace(new places.Autocomplete(destinationRef.current, options));

        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [map, places, routesLibrary]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        const onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        };

        let originValue = originRef.current;
        let destinationValue = destinationRef.current;
        let originListener: google.maps.MapsEventListener | null = null;

        if (originPlace && destinationValue) {
            originListener = originPlace.addListener("place_changed", () => {
                onPlaceSelect(originPlace.getPlace());
            });
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
                    provideRouteAlternatives: true,
                })
                .then((response) => {
                    directionsRenderer.setDirections(response);
                    setRoutes(response.routes);
                })
                .catch((e) => console.log("Directions request failed due to "));
        }

        return () => {
            if (originListener) {
                originListener.remove();
                setOriginPlace(null);
            }

            if (destinationValue) {
                destinationValue.removeEventListener("change", onChangeHandler);
            }
            directionsRenderer.setMap(null);
        };
    }, [onPlaceSelect, originPlace, destinationPlace, directionsService, directionsRenderer]);

    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    return (
        <>
            <div>
                <input ref={originRef} />
                <input ref={destinationRef} />
            </div>

            {selected && (
                <div className="directions">
                    {/* <h2>{selected?.summary}</h2> */}
                    {/*  <p>
                        {leg?.start_address.split(",")[0]} to {leg?.end_address.split(",")[0]}
                    </p> */}
                    {/* <div className={classes.leg}>
                        <p>Distance: {leg?.distance?.text}</p>
                        <p>Duration: {leg?.duration?.text}</p>
                    </div> */}

                    {/* <h2>Other Routes</h2>
                    <ul>
                        {routes.map((route, index) => (
                            <li key={route.summary}>
                                <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
                            </li>
                        ))}
                    </ul> */}
                </div>
            )}
        </>
    );
};

export default Directions;
