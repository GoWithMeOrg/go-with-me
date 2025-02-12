import React from "react";
import { NextPage } from "next";
import { Input } from "@/components/shared/Input";

import classes from "./page.module.css";
import { Label } from "@/components/shared/Label";
import { faker } from "@faker-js/faker";
import mongooseConnect from "@/database/mongooseConnect";
import EventModel from "@/database/models/Event";
import { Button } from "@/components/shared/Button";
import mongoose from "mongoose";

import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";
import { Autocomplete } from "@/components/widgets/GoogleMap";
import { optionsCities } from "@/components/widgets/GoogleMap/OptionsAutocomplete";
import { useEventFilters } from "@/components/widgets/EventFilters/hooks/useEventFilters";
import GeneratorEvents from "@/components/widgets/GeneratorEvents/GeneratorEvents";

const Generator: NextPage = () => {
    mongooseConnect();

    //generateEvents();

    return (
        <div className={classes.generator}>
            <GeneratorEvents />
        </div>
    );
};

export default Generator;
