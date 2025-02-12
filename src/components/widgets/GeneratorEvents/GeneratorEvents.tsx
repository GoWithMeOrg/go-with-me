"use client";

import { Input } from "@/components/shared/Input";
import { Label } from "@/components/shared/Label";
import React, { useState } from "react";
import { Autocomplete } from "../GoogleMap";
import { optionsCities } from "../GoogleMap/OptionsAutocomplete";

import classes from "./GeneratorEvents.module.css";
import { useEventFilters } from "../EventFilters/hooks/useEventFilters";
import { Button } from "@/components/shared/Button";
import { FilteredEventsLocation } from "../FilteredEventsLocation";

const GeneratorEvents = () => {
    const { setSelectedLocation } = useEventFilters();

    return (
        <>
            <h3>Генератор случайных событий</h3>
            <Label label="Укажите количество событий">
                <Input />
            </Label>

            <FilteredEventsLocation onChange={setSelectedLocation} />

            <Button className={classes.generateButton}>Сгенерировать события</Button>
        </>
    );
};

export default GeneratorEvents;
