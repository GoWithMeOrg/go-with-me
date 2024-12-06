import React, { FC } from "react";
import Arrow from "@/assets/icons/arrow.svg";
import { Button } from "@/components/shared/Button";

import classes from "./Control.module.css";

interface ControlsProps {
    onNext: () => void;
}

export const Control: FC<ControlsProps> = ({ onNext }) => {
    return (
        <div className={classes.control}>
            <Button onClick={onNext} resetDefaultStyles={true} className={`${classes.button} ${classes.next}`}>
                <Arrow style={{ rotate: "180deg" }} />
            </Button>
        </div>
    );
};

export default Control;
