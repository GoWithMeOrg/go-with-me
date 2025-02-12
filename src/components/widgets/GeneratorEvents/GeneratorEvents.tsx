"use client";
import React, { useState } from "react";
import { Input } from "@/components/shared/Input";
import { Label } from "@/components/shared/Label";

import { useEventFilters } from "../EventFilters/hooks/useEventFilters";
import { Button } from "@/components/shared/Button";
import { FilteredEventsLocation } from "../FilteredEventsLocation";

import classes from "./GeneratorEvents.module.css";
import { generateEvents } from "@/app/api/generator/route";

const GeneratorEvents = () => {
    const { selectedLocation, setSelectedLocation } = useEventFilters();
    const [eventNumber, setEventNumber] = useState<number>();

    const changeEventNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberValue = parseInt(e.target.value, 10);
        setEventNumber(numberValue);
    };

    const handleGenerateEvents = () => {
        if (!eventNumber || eventNumber <= 0) return;
        console.log(
            "Generating events:",
            eventNumber,
            "at location:",
            selectedLocation?.geometry?.location?.lng(),
            selectedLocation?.geometry?.location?.lat(),

            "address",
            selectedLocation?.formatted_address,
        );

        generateEvents(
            eventNumber,
            [
                selectedLocation?.geometry?.location?.lng() as number,
                selectedLocation?.geometry?.location?.lat() as number,
            ],
            selectedLocation?.formatted_address as string,
        );
    };

    return (
        <>
            <h3>Генератор случайных событий</h3>
            <Label label="Укажите количество событий">
                <Input type="number" onChange={changeEventNumber} />
            </Label>

            <FilteredEventsLocation onChange={setSelectedLocation} />

            <Button className={classes.generateButton} onClick={handleGenerateEvents}>
                Сгенерировать события
            </Button>
        </>
    );
};

export default GeneratorEvents;
