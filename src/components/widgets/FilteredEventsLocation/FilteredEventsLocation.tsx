import React from "react";
import { Autocomplete } from "../GoogleMap";
import { Label } from "@/components/shared/Label";
import { optionsCities } from "../GoogleMap/OptionsAutocomplete";

import classes from "./FilteredEventsLocation.module.css";

export const FilteredEventsLocation = () => {
    return (
        <div className={classes.location}>
            <Label label={"Location"} />
            <Autocomplete onPlaceSelect={() => {}} className={classes.autocomplete} options={optionsCities} />
        </div>
    );
};

export default FilteredEventsLocation;
