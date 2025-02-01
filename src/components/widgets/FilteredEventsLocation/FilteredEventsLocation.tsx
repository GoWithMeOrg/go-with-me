import React, { FC } from "react";
import { Autocomplete } from "../GoogleMap";
import { Label } from "@/components/shared/Label";
import { optionsCities } from "@/components/widgets/GoogleMap/OptionsAutocomplete";

import classes from "./FilteredEventsLocation.module.css";

interface FilteredEventsLocationProps {
    onChange: (...event: any[]) => void;
}

export const FilteredEventsLocation: FC<FilteredEventsLocationProps> = ({ onChange }) => {
    return (
        <div className={classes.location}>
            <Label label={"Location"} />

            <Autocomplete onPlaceSelect={onChange} className={classes.autocomplete} options={optionsCities} />
        </div>
    );
};

export default FilteredEventsLocation;
