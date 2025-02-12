"use client";
import React, { use, useState } from "react";
import { Input } from "@/components/shared/Input";
import { Label } from "@/components/shared/Label";

import { useEventFilters } from "../EventFilters/hooks/useEventFilters";
import { Button } from "@/components/shared/Button";
import { FilteredEventsLocation } from "../FilteredEventsLocation";

import classes from "./GeneratorEvents.module.css";

const GeneratorEvents = () => {
    const { selectedLocation, setSelectedLocation } = useEventFilters();
    const [eventNumber, setEventNumber] = useState<number>();
    const [generatedEvents, setGeneratedEvents] = useState(null);

    const changeEventNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberValue = parseInt(e.target.value, 10);
        setEventNumber(numberValue);
    };

    const handleGenerateEvents = async () => {
        if (!eventNumber || eventNumber <= 0) return;
        // Параметры для запроса на генерацию событий
        const payload = {
            num: eventNumber,
            coordinates: [selectedLocation?.geometry?.location?.lng(), selectedLocation?.geometry?.location?.lat()],
            address: selectedLocation?.formatted_address,
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
        <>
            <h3>Генератор случайных событий</h3>

            <div>
                <Label label="Укажите количество событий">
                    <Input type="number" onChange={changeEventNumber} />
                </Label>

                <FilteredEventsLocation onChange={setSelectedLocation} />

                <Button className={classes.generateButton} onClick={handleGenerateEvents}>
                    Сгенерировать события
                </Button>
            </div>

            {generatedEvents && <Label label={"Ваши события сгенерированы"} className={classes.label} />}
        </>
    );
};

export default GeneratorEvents;
