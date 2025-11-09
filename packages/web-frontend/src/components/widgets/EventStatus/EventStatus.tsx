import { forwardRef } from "react";

import classes from "./EventStatus.module.css";

interface IEventStatus {
    options?: {
        PUBLIC: string;
        PRIVATE: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected: string;
}

export const EventStatus = forwardRef(function EventStatus(props: IEventStatus, ref) {
    return (
        <div className={classes.confidentiality}>
            <span className={classes.confidentialityTitle}>Приватность</span>

            <div className={classes.confidentialityWrapper}>
                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id={props.options?.PUBLIC}
                        value={props.options?.PUBLIC}
                        onChange={(e) => props.onChange(e)}
                        checked={props.selected === props.options?.PUBLIC}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor={props.options?.PUBLIC}>
                        Публичное событие
                    </label>
                </div>

                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id={props.options?.PRIVATE}
                        value={props.options?.PRIVATE}
                        onChange={(e) => props.onChange(e)}
                        checked={props.selected === props.options?.PRIVATE}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor={props.options?.PRIVATE}>
                        Приватное событие
                    </label>
                </div>
            </div>
        </div>
    );
});

export default EventStatus;
