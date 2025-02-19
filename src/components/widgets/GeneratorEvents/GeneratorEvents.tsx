import React, { useEffect, useState } from "react";
import { Input } from "@/components/shared/Input";
import { Label } from "@/components/shared/Label";

import { useEventFilters } from "../EventFilters/hooks/useEventFilters";
import { Button } from "@/components/shared/Button";
import { FilteredEventsLocation } from "../FilteredEventsLocation";
import { faker } from "@faker-js/faker";

import classes from "./GeneratorEvents.module.css";
import { useSession } from "next-auth/react";
import { optionsFullAdress } from "../GoogleMap/OptionsAutocomplete";
import { useApiIsLoaded, useMapsLibrary } from "@vis.gl/react-google-maps";

const GeneratorEvents = () => {
    // const apiIsLoaded = useApiIsLoaded();
    // const geocoding = useMapsLibrary("geocoding");
    // const { data: session } = useSession();
    // const userID = session?.user.id;
    // const { selectedLocation, setSelectedLocation } = useEventFilters();
    // const [eventNumber, setEventNumber] = useState<number>();
    // const [generatedEvents, setGeneratedEvents] = useState(null);
    // const [cityCoordinates, setCityCoordinates] = useState<[number, number] | null>(null);
    // const city = faker.location.city();
    //console.log(city);
    // useEffect(() => {
    //     if (!apiIsLoaded) {
    //         console.warn("API не загружен.");
    //         return;
    //     }
    //     if (!geocoding) {
    //         console.warn("Библиотека геокодирования не загружена.");
    //         return;
    //     }
    // const geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ address: city }, (results, status) => {
    //     if (status === "OK" && results && results.length > 0) {
    //         const lng = results[0].geometry.location.lng();
    //         const lat = results[0].geometry.location.lat();
    //         setCityCoordinates([lng, lat]);
    //         console.log("Координаты города:", [lng, lat]);
    //     } else {
    //         console.error("Ошибка геокодирования:", status);
    //     }
    // });
    // }, [apiIsLoaded, geocoding]);
    //console.log(cityCoordinates);
    // const changeEventNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const numberValue = parseInt(e.target.value, 10);
    //     setEventNumber(numberValue);
    // };
    // const handleGenerateEvents = async () => {
    //     if (!eventNumber || eventNumber <= 0) return;
    //     // Параметры для запроса на генерацию событий
    //     const payload = {
    //         id: userID,
    //         num: eventNumber,
    //         coordinates: [selectedLocation?.geometry?.location?.lng(), selectedLocation?.geometry?.location?.lat()],
    //         address: selectedLocation?.formatted_address,
    //     };
    //     //запрос
    //     try {
    //         const res = await fetch("/api/generator", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(payload),
    //         });
    //         const data = await res.json();
    //         setGeneratedEvents(data);
    //         if (!res.ok) throw new Error(data.error || "Ошибка при генерации событий");
    //         console.log("✅ События успешно сгенерированы:", data);
    //     } catch (error) {
    //         console.error("❌ Ошибка при генерации событий:", error);
    //     }
    // };
    // return (
    //     <>
    //         <h3>Генератор случайных событий</h3>
    //         <div>
    //             <Label label="Укажите количество событий">
    //                 <Input type="number" onChange={changeEventNumber} />
    //             </Label>
    //             <FilteredEventsLocation onChange={setSelectedLocation} options={optionsFullAdress} />
    //             <Button className={classes.generateButton} onClick={handleGenerateEvents}>
    //                 Сгенерировать события
    //             </Button>
    //         </div>
    //         {generatedEvents && <Label label={"Cобытия сгенерированы"} className={classes.label} />}
    //     </>
    // );
};

export default GeneratorEvents;
