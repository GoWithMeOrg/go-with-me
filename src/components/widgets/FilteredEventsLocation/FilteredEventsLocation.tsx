import React, { FC } from "react";
import { Autocomplete, Geocoding } from "../GoogleMap";
import { Label } from "@/components/shared/Label";
import { optionsCities } from "@/components/widgets/GoogleMap/OptionsAutocomplete";

import classes from "./FilteredEventsLocation.module.css";

interface FilteredEventsLocationProps {
    onChange: (...event: any[]) => void;
    coordinates: [number, number];
}

export const FilteredEventsLocation: FC<FilteredEventsLocationProps> = ({ onChange, coordinates }) => {
    // console.log(coordinates);
    return (
        <div className={classes.location}>
            <Label label={"Location"} />

            <Autocomplete onPlaceSelect={onChange} className={classes.autocomplete} options={optionsCities} />
            <Geocoding coordinates={coordinates} />
        </div>
    );
};

export default FilteredEventsLocation;
