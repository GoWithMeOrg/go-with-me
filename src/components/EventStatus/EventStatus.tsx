import { forwardRef } from "react";
import classes from "./EventStatus.module.css";
import { RefCallBack } from "react-hook-form";
import { Status } from "@/components/EventForm/EventForm";

interface IEventStatus {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected: string;
}

export const EventStatus = forwardRef(function EventStatus(props: IEventStatus, ref) {
    return (
        <div className={classes.confidentiality}>
            <span className={classes.confidentialityTitle}>Confidentiality</span>

            <div className={classes.confidentialityWrapper}>
                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id={Status.PUBLIC}
                        value={Status.PUBLIC}
                        onChange={(e) => props.onChange(e)}
                        checked={props.selected === Status.PUBLIC}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor={Status.PUBLIC}>
                        Public event
                    </label>
                </div>

                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id={Status.INVATION}
                        value={Status.INVATION}
                        onChange={(e) => props.onChange(e)}
                        checked={props.selected === Status.INVATION}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor={Status.INVATION}>
                        By invation only
                    </label>
                </div>

                <div className={classes.confidentialityRadio}>
                    <input
                        type="radio"
                        name="eventStatus"
                        id={Status.PRIVATE}
                        value={Status.PRIVATE}
                        onChange={(e) => props.onChange(e)}
                        checked={props.selected === Status.PRIVATE}
                        className={classes.confidentialityInput}
                    />
                    <label className={classes.confidentialityLabel} htmlFor={Status.PRIVATE}>
                        Private event
                    </label>
                </div>
            </div>
        </div>
    );
});

export default EventStatus;
