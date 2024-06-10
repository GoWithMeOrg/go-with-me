import { forwardRef, useState } from "react";
import classes from "./EventStatus.module.css";
import { RefCallBack } from "react-hook-form";

interface IEventStatus {
    options?: {
        PUBLIC: string;
        INVATION: string;
        PRIVATE: string;
    };
    ref: RefCallBack;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected: string;
}

export const EventStatus = forwardRef(function EventStatus(props: IEventStatus, ref) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e);
    };

    return (
        <div className={classes.confidentiality}>
            <span className={classes.confidentialityTitle}>Confidentiality</span>

            <div className={classes.confidentialityWrapper}>
                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id={props.options?.PUBLIC}
                        value={props.options?.PUBLIC}
                        onChange={handleChange}
                        checked={props.selected === props.options?.PUBLIC}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor={props.options?.PUBLIC}>
                        Public event
                    </label>
                </div>

                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id={props.options?.INVATION}
                        value={props.options?.INVATION}
                        onChange={handleChange}
                        checked={props.selected === props.options?.INVATION}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor={props.options?.INVATION}>
                        By invation only
                    </label>
                </div>

                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id={props.options?.PRIVATE}
                        value={props.options?.PRIVATE}
                        onChange={handleChange}
                        checked={props.selected === props.options?.PRIVATE}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor={props.options?.PRIVATE}>
                        Private event
                    </label>
                </div>
            </div>
        </div>
    );
});

export default EventStatus;
