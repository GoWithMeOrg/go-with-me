"use client";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import { useSession } from "next-auth/react";
import { useEventFilters } from "@/components/widgets/EventFilters/hooks/useEventFilters";
import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";
import { FilteredEventsLocation } from "@/components/widgets/FilteredEventsLocation";
import { optionsFullAdress } from "@/components/widgets/GoogleMap/OptionsAutocomplete";
import { Button } from "@/components/shared/Button";

import classes from "./page.module.css";
import { faker } from "@faker-js/faker";
import cities from "./world_cities.json";

type City = {
    country: string;
    lat: number;
    lng: number;
    name: string;
};

const Generator: NextPage = () => {
    const { data: session } = useSession();
    const userID = session?.user.id;

    const { selectedLocation, setSelectedLocation } = useEventFilters();

    const [eventNumber, setEventNumber] = useState<number>();
    const [generatedEvents, setGeneratedEvents] = useState(null);
    const [city, setCity] = useState<City | null>(null);

    useEffect(() => {
        if (Array.isArray(cities)) {
            const randomCity = faker.helpers.arrayElement(cities);
            // Нужно преобразовать координаты из строки в число.
            setCity({ ...randomCity, lng: parseFloat(randomCity.lng), lat: parseFloat(randomCity.lat) });
        }
    }, []);

    const changeEventNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberValue = parseInt(e.target.value, 10);
        setEventNumber(numberValue);
    };

    const handleGenerateEvents = async () => {
        let coord, addr;
        if (!eventNumber || eventNumber <= 0) return;
        if (!selectedLocation) {
            coord = [city?.lng, city?.lat];
            addr = city?.name;
        } else {
            coord = [selectedLocation?.geometry?.location?.lng(), selectedLocation?.geometry?.location?.lat()];
            addr = selectedLocation?.formatted_address;
        }

        // Параметры для запроса на генерацию событий
        const payload = {
            id: userID,
            num: eventNumber,
            coordinates: coord,
            address: addr,
        };

        //запрос
        try {
            const res = await fetch("/api/generator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            setGeneratedEvents(data);

            if (!res.ok) throw new Error(data.error || "Ошибка при генерации событий");

            console.log("✅ События успешно сгенерированы:", data);
        } catch (error) {
            console.error("❌ Ошибка при генерации событий:", error);
        }
    };

    return (
        <div className={classes.generator}>
            <h3>Генератор случайных событий</h3>

            <div>
                <Label label="Укажите количество событий">
                    <Input type="number" onChange={changeEventNumber} />
                </Label>

                <FilteredEventsLocation onChange={setSelectedLocation} options={optionsFullAdress} />

                <Button className={classes.generateButton} onClick={handleGenerateEvents}>
                    Сгенерировать события
                </Button>
            </div>

            {generatedEvents && <Label label={"Cобытия сгенерированы"} className={classes.label} />}
        </div>
    );
};

export default Generator;
