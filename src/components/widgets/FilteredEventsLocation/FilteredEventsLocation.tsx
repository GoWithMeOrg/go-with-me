import React, { FC } from "react";
import { Autocomplete } from "../GoogleMap";
import { Label } from "@/components/shared/Label";
import { optionsCities } from "@/components/widgets/GoogleMap/OptionsAutocomplete";

import classes from "./FilteredEventsLocation.module.css";

export interface FilteredEventsLocationProps {
    options: google.maps.places.AutocompleteOptions;
    onChange: (...event: any[]) => void;
}

export const FilteredEventsLocation: FC<FilteredEventsLocationProps> = ({ options, onChange }) => {
    return (
        <div className={classes.location}>
            <Label label={"Location"} />

            <Autocomplete onPlaceSelect={onChange} className={classes.autocomplete} options={options} />
        </div>
    );
};

export default FilteredEventsLocation;
