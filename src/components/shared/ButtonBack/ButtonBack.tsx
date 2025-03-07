import { Button } from "@/components/shared/Button";

import Arrow from "@/assets/icons/arrow.svg";

import classes from "./ButtonBack.module.css";

export const ButtonBack = () => {
    return (
        <Button resetDefaultStyles={true} className={`${classes.button} ${classes.next}`}>
            <Arrow />
        </Button>
    );
};

export default ButtonBack;
