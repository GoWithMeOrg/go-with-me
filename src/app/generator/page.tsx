"use client";
import React from "react";
import { NextPage } from "next";

import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";
import { FilteredEventsLocation } from "@/components/widgets/FilteredEventsLocation";
import { optionsFullAdress } from "@/components/widgets/GoogleMap/OptionsAutocomplete";
import { Button } from "@/components/shared/Button";

import classes from "./page.module.css";
import { useGenerator } from "./hooks";

const Generator: NextPage = () => {
    const {
        changeNumberItems,
        setSelectedLocation,
        handleGenerateEvents,
        generatedEvents,
        handleGenerateUsers,
        generatedUsers,
    } = useGenerator();

    return (
        <div className={classes.generator}>
            <h3>Генератор случайных событий</h3>

            <div>
                <Label label="Укажите количество событий">
                    <Input type="number" onChange={changeNumberItems} min="1" max="10" />
                </Label>

                <FilteredEventsLocation onChange={setSelectedLocation} options={optionsFullAdress} />

                <Button className={classes.generateButton} onClick={handleGenerateEvents}>
                    Сгенерировать события
                </Button>
            </div>

            {generatedEvents && <Label label={"Cобытия сгенерированы"} className={classes.label} />}

            <h3 style={{ marginTop: "50px" }}>Генератор пользователей</h3>

            <div>
                <Label label="Укажите количество пользователей">
                    <Input type="number" onChange={changeNumberItems} min="1" max="10" />
                </Label>

                <FilteredEventsLocation onChange={setSelectedLocation} options={optionsFullAdress} />

                <Button className={classes.generateButton} onClick={handleGenerateUsers}>
                    Сгенерировать пользователей
                </Button>
            </div>

            {generatedUsers && <Label label={"Пользователи сгенерированы"} className={classes.label} />}
        </div>
    );
};

export default Generator;
